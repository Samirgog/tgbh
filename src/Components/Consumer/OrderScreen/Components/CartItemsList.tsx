import { Trash } from 'lucide-react';
import { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useShallow } from 'zustand/react/shallow';

import { QuantityInput } from '@/Components/Common/QuantityInput';
import { RUBLE_SYMBOL } from '@/Consts';
import { CartItem } from '@/Models/Catalog'; // Предполагается, что тип CartItem определен здесь
import { useConsumerStore } from '@/Store/Consumer';

// Константы для свайпа
const DELETE_BUTTON_WIDTH = 80; // Ширина кнопки удаления в пикселях
const SWIPE_THRESHOLD = DELETE_BUTTON_WIDTH / 2; // Порог свайпа для "открытия" кнопки (40px)
const ELASTIC_FACTOR = 0.5; // Фактор упругости
const MAX_ELASTIC_PULL = 100; // Максимальное расстояние, на которое можно растянуть за кнопку
const HORIZONTAL_SWIPE_THRESHOLD = 5; // Минимальное горизонтальное смещение для определения свайпа

const Container = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin: 0 -16px;
`;

const SwipeContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    background-color: var(--tg-theme-destructive-text-color, #ff3b30); /* Красный фон подложки */
    overflow: hidden; /* Скрываем содержимое, выходящее за скругление */

    &:last-child {
        margin-bottom: 0;
    }
`;

const SwipedItem = styled.div<{ $transformX: number; $isSwiping: boolean }>`
    display: flex;
    align-items: center;
    flex-grow: 1;
    background-color: var(--tg-theme-secondary-bg-color, #ffffff); // Фон самого элемента (белый/серый)
    padding: 10px;
    /* Transform теперь полностью управляется пропом $transformX */
    transform: translateX(${(props) => props.$transformX}px);
    /* Transition управляется пропом $isSwiping:
       - 0s во время активного свайпа ($isSwiping = true)
       - 0.3s ease-out после завершения свайпа ($isSwiping = false)
    */
    transition: transform ${(props) => (props.$isSwiping ? '0s' : '0.3s ease-out')}; /* Ваша длительность анимации */
    cursor: pointer;
    min-width: 0;
    flex-shrink: 0;
    position: relative;
    z-index: 2;
`;

const ItemImage = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 9999px;
    margin-right: 10px;
    flex-shrink: 0;
`;

const ItemDetails = styled.div`
    flex-grow: 1;
    min-width: 0;
    margin-right: 10px;
`;

const ItemName = styled.div`
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ItemPrice = styled.div`
    font-size: 0.9em;
    color: var(--tg-theme-hint-color, #666);
`;

const QuantityWrapper = styled.div`
    flex-shrink: 0;
`;

const DeleteButton = styled.button`
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    width: ${DELETE_BUTTON_WIDTH}px;
    background-color: transparent;
    color: var(--tg-theme-button-text-color, #ffffff);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.2em;
    transition: background-color 0.2s ease;

    &:active {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

const getItemAmount = (item: CartItem) => {
    if (item.parameter) {
        return (item.parameter.price?.amount ?? 0) * item.quantity;
    }
    return (item.product.price?.amount ?? 0) * item.quantity;
};

export const CartItemsList: FunctionComponent = () => {
    const { cart, changeQuantity } = useConsumerStore(
        useShallow(({ cart, changeQuantity }) => ({ cart, changeQuantity })),
    );

    // Состояние для хранения текущей translateX позиции каждого элемента
    // Инициализируем при монтировании или обновлении корзины в useEffect
    const [itemPositions, setItemPositions] = useState<{ [itemId: string]: number }>({});

    // Состояние для отслеживания открытого свайпом элемента (логическое состояние)
    const [openItemId, setOpenItemId] = useState<string | null>(null);
    // Состояние для отслеживания АКТИВНОГО свайпа (включает/отключает transition)
    const [isSwipingState, setIsSwipingState] = useState(false);

    // Рефы для отслеживания текущего свайпа
    const swipeStartX = useRef(0);
    const swipeStartClientY = useRef(0);
    const swipedItemIdRef = useRef<string | null>(null);
    // Начальная позиция элемента при старте свайпа (0 или -80, если уже открыт)
    const swipeStartPositionX = useRef(0);

    // Эффект для синхронизации itemPositions с корзиной
    useEffect(() => {
        setItemPositions((prevPositions) => {
            const newItemPositions: { [itemId: string]: number } = {};
            let shouldResetOpenItem = false;
            let shouldResetSwiping = false;

            cart.forEach((item) => {
                const itemId = `${item.product?.id || 'no_product'}-${item.parameter?.id || 'no_param'}`;
                // Сохраняем позицию, если элемент уже был в prevPositions, иначе ставим 0
                newItemPositions[itemId] = prevPositions[itemId] ?? 0;

                // Проверяем, существует ли в новой корзине элемент, который был открыт или свайпался
                if (openItemId === itemId) shouldResetOpenItem = true;
                if (isSwipingState && swipedItemIdRef.current === itemId) shouldResetSwiping = true;
            });

            // Если открытый элемент или свайпаемый элемент удален из корзины, сбрасываем состояния
            if (openItemId && !shouldResetOpenItem) setOpenItemId(null);
            if (isSwipingState && swipedItemIdRef.current && !shouldResetSwiping) {
                setIsSwipingState(false);
                swipedItemIdRef.current = null;
                swipeStartX.current = 0;
                swipeStartClientY.current = 0;
                swipeStartPositionX.current = 0;
            }

            // Удаляем позиции для элементов, которых больше нет в корзине
            for (const id in prevPositions) {
                if (!newItemPositions[id]) {
                    delete prevPositions[id];
                }
            }

            return newItemPositions; // Возвращаем обновленные позиции
        });
    }, [cart, openItemId, isSwipingState]); // Зависимость от корзины, открытого элемента и состояния свайпа

    const getHandleChangeQuantity = useCallback(
        (item: CartItem) => {
            const itemId = `${item.product?.id || 'no_product'}-${item.parameter?.id || 'no_param'}`;
            return (quantity: number) => {
                if (quantity === 0) {
                    changeQuantity({ productId: item.product?.id, parameterId: item.parameter?.id, quantity: 0 });
                    // Удаление из itemPositions произойдет в useEffect при обновлении cart
                } else {
                    changeQuantity({ productId: item.product?.id, parameterId: item.parameter?.id, quantity });
                    // Если количество изменилось (> 0), закрываем свайп
                    setItemPositions((prev) => ({ ...prev, [itemId]: 0 })); // Плавно возвращаем в 0
                    setOpenItemId(null); // Сбрасываем логическое состояние открытости
                    setIsSwipingState(false); // Включаем анимацию
                    // Сбрасываем рефы
                    swipedItemIdRef.current = null;
                    swipeStartX.current = 0;
                    swipeStartClientY.current = 0;
                    swipeStartPositionX.current = 0;
                }
            };
        },
        [changeQuantity],
    );

    const handleDeleteItem = useCallback(
        (item: CartItem) => {
            getHandleChangeQuantity(item)(0);
        },
        [getHandleChangeQuantity],
    );

    const handleTouchStart = useCallback(
        (e: React.TouchEvent, itemId: string) => {
            // Если уже идет свайп на другом элементе, игнорируем новый тачстарт
            if (isSwipingState && swipedItemIdRef.current && swipedItemIdRef.current !== itemId) {
                return;
            }

            // Если элемент, который мы тапаем, сейчас открыт, и мы начинаем свайп,
            // это, возможно, жест закрытия или начало нового свайпа из открытого состояния
            if (openItemId && openItemId !== itemId) {
                // Закрываем любой другой открытый элемент
                setItemPositions((prev) => ({ ...prev, [openItemId]: 0 }));
                setOpenItemId(null);
                // Не выключаем isSwipingState пока, новый свайп начнется
            }

            swipedItemIdRef.current = itemId; // Отмечаем этот элемент как свайпаемый
            swipeStartX.current = e.touches[0].clientX; // Координата X начала касания
            swipeStartClientY.current = e.touches[0].clientY; // Координата Y начала касания

            // Получаем ТЕКУЩУЮ позицию элемента из состояния itemPositions
            const startTransform = itemPositions[itemId] ?? 0;
            swipeStartPositionX.current = startTransform; // Сохраняем как стартовую позицию свайпа

            setIsSwipingState(true); // Включаем режим свайпа (отключает transition)
        },
        [openItemId, isSwipingState, itemPositions], // Зависимости: нужно знать openItemId, isSwipingState и itemPositions
    );

    const handleTouchMove = useCallback(
        (e: React.TouchEvent, itemId: string) => {
            // Обрабатываем только текущий активный свайп для правильного элемента
            if (swipedItemIdRef.current !== itemId || !isSwipingState) return;

            const currentX = e.touches[0].clientX;
            const deltaX = currentX - swipeStartX.current; // Дельта от НАЧАЛА КАСАНИЯ

            // Рассчитываем целевую позицию, отталкиваясь от позиции СТАРТА СВАЙПА (swipeStartPositionX.current)
            const targetTranslateX = swipeStartPositionX.current + deltaX;

            let finalTranslateX = targetTranslateX; // Начальное значение для финального сдвига

            const boundary = -DELETE_BUTTON_WIDTH;

            if (targetTranslateX < boundary) {
                // Элемент тянется влево дальше границы кнопки. Применяем упругость.
                const distanceBeyondBoundary = boundary - targetTranslateX; // На сколько пикселей пытаемся уйти за границу (положительное число)
                const elasticOffset = Math.min(distanceBeyondBoundary * ELASTIC_FACTOR, MAX_ELASTIC_PULL);
                finalTranslateX = boundary - elasticOffset;
            } else if (targetTranslateX > 0) {
                // Элемент тянется вправо дальше нуля. Ограничиваем на 0.
                finalTranslateX = 0;
            }
            // Если 0 >= targetTranslateX >= boundary, finalTranslateX = targetTranslateX

            // Проверяем, был ли свайп преимущественно горизонтальным для предотвращения скролла
            const touch = e.touches[0];
            const deltaY = touch.clientY - swipeStartClientY.current;
            const absDeltaX = Math.abs(deltaX);
            const absDeltaY = Math.abs(deltaY);

            // Если горизонтальное смещение превысило порог И оно больше вертикального
            if (absDeltaX > HORIZONTAL_SWIPE_THRESHOLD && absDeltaX > absDeltaY) {
                e.preventDefault(); // Предотвращаем стандартное действие (скролл)
                e.stopPropagation(); // Останавливаем всплытие
            }

            // Обновляем состояние itemPositions с новой позицией элемента
            // Это вызовет ре-рендер, и transform обновится (мгновенно, т.к. transition: 0s)
            setItemPositions((prev) => ({ ...prev, [itemId]: finalTranslateX }));
        },
        [isSwipingState, itemPositions, swipeStartPositionX], // Зависимости: isSwipingState, itemPositions (для setItemPositions), swipeStartPositionX
    );

    const handleTouchEnd = useCallback(
        (e: React.TouchEvent, itemId: string) => {
            // Проверяем, что это завершение активного свайпа для правильного элемента
            if (swipedItemIdRef.current !== itemId || !isSwipingState) return;

            // Получаем ОБЩЕЕ расстояние свайпа по X от НАЧАЛЬНОЙ ТОЧКИ КАСАНИЯ
            const totalDragDistanceX = e.changedTouches[0].clientX - swipeStartX.current;
            // Получаем ОБЩЕЕ расстояние свайпа по Y от НАЧАЛЬНОЙ ТОЧКИ КАСАНИЯ
            const totalDragDistanceY = e.changedTouches[0].clientY - swipeStartClientY.current;

            // Получаем ТЕКУЩУЮ позицию элемента (где он остановился)
            const currentTranslateX = itemPositions[itemId] ?? 0;

            let targetTranslateX: number; // Конечная позиция (0 или -80)
            let newOpenItemId: string | null = null; // Логическое состояние открытости

            // Определяем, должен ли элемент зафиксироваться в открытом положении (-80) или закрытом (0)
            // Решение принимается на основе ОБЩЕГО расстояния свайпа от старта,
            // ИЛИ если текущая позиция уже достаточно далеко влево (на случай короткого, но быстрого свайпа)
            // ИЛИ если это был преимущественно горизонтальный свайп
            const isSignificantHorizontalSwipe =
                Math.abs(totalDragDistanceX) > HORIZONTAL_SWIPE_THRESHOLD &&
                Math.abs(totalDragDistanceX) > Math.abs(totalDragDistanceY);

            if (isSignificantHorizontalSwipe && totalDragDistanceX < -SWIPE_THRESHOLD) {
                // Если был значительный горизонтальный свайп влево дальше порога
                targetTranslateX = -DELETE_BUTTON_WIDTH; // Зафиксировать в открытом положении
                newOpenItemId = itemId;
            } else if (currentTranslateX < -SWIPE_THRESHOLD * 0.5) {
                // Альтернативная проверка: если даже без учета общей дельты, элемент уже находится
                // достаточно далеко влево (например, его быстро дернули и отпустили до того, как deltaX стала большой)
                // Используем меньший порог для этого случая, чтобы избежать ложных срабатываний
                targetTranslateX = -DELETE_BUTTON_WIDTH;
                newOpenItemId = itemId;
            } else {
                // Иначе, возвращаем в закрытое положение
                targetTranslateX = 0;
                newOpenItemId = null;
            }

            // Обновляем состояние itemPositions на конечную позицию (0 или -80)
            // Это вызовет ре-рендер, и transform применится ПЛАВНО, т.к. isSwipingState станет false
            setItemPositions((prev) => ({ ...prev, [itemId]: targetTranslateX }));

            setOpenItemId(newOpenItemId); // Обновляем логическое состояние
            setIsSwipingState(false); // Свайп завершен (включает transition)

            // Сбрасываем временные рефы
            swipedItemIdRef.current = null;
            swipeStartX.current = 0;
            swipeStartClientY.current = 0;
            swipeStartPositionX.current = 0;
        },
        [isSwipingState, itemPositions],
    ); // Зависимости: isSwipingState, itemPositions (для чтения текущей позиции)

    // Обработчик отмены касания (жест прерван системой)
    const handleTouchCancel = useCallback(
        (e: React.TouchEvent, itemId: string) => {
            if (swipedItemIdRef.current !== itemId || !isSwipingState) return;

            // При отмене свайпа, возвращаем элемент в исходное положение при старте свайпа
            // (или предыдущее открытое/закрытое состояние)
            const targetTranslateX = swipeStartPositionX.current; // Возвращаемся к позиции, с которой начали свайп

            // Обновляем состояние itemPositions на целевую позицию
            setItemPositions((prev) => ({ ...prev, [itemId]: targetTranslateX }));

            // Определяем логическое состояние открытости по этой позиции
            const targetOpenItemId = targetTranslateX < -SWIPE_THRESHOLD * 0.5 ? itemId : null; // Используем порог для определения открытости

            setOpenItemId(targetOpenItemId); // Обновляем логическое состояние
            setIsSwipingState(false); // Свайп завершен (включает transition)

            // Сбрасываем временные рефы
            swipedItemIdRef.current = null;
            swipeStartX.current = 0;
            swipeStartClientY.current = 0;
            swipeStartPositionX.current = 0;
        },
        [isSwipingState, itemPositions, swipeStartPositionX],
    );

    // Обработчик клика по элементу
    const handleItemClick = useCallback(
        (e: React.MouseEvent, itemId: string) => {
            // Считываем текущий transformX из состояния (оно всегда актуально)
            const currentItemTranslateX = itemPositions[itemId] ?? 0;

            // Если элемент был сдвинут (больше минимального порога), считаем это кликом для закрытия свайпа
            if (Math.abs(currentItemTranslateX) > HORIZONTAL_SWIPE_THRESHOLD) {
                // Используем порог для определения "сдвинутости"
                e.preventDefault(); // Предотвращаем стандартное действие клика
                e.stopPropagation(); // Останавливаем всплытие

                // Если элемент открыт (зафиксирован в открытом положении по state openItemId)
                if (openItemId === itemId) {
                    setItemPositions((prev) => ({ ...prev, [itemId]: 0 })); // Плавно возвращаем в 0
                    setOpenItemId(null); // Сбрасываем логическое состояние
                    setIsSwipingState(false); // Включаем анимацию (если она еще не включена)
                }
                // Если элемент был сдвинут, но не открыт (например, отменен свайп до порога),
                // клик по нему просто игнорируется, т.к. preventDefault уже вызван.

                return; // Клик был обработан (связан со свайпом или его отменой)
            }
        },
        [openItemId, isSwipingState, itemPositions],
    );

    // Эффект для обработки закрытия открытого элемента, если данные корзины изменились
    useEffect(() => {
        // Проверяем, если открытый элемент (openItemId) больше не существует в корзине
        if (openItemId) {
            const itemExists = cart.some((item) => {
                const currentItemId = `${item.product?.id || 'no_product'}-${item.parameter?.id || 'no_param'}`;
                return currentItemId === openItemId;
            });

            if (!itemExists) {
                // Если открытый элемент был удален, сбрасываем состояние
                setOpenItemId(null);
                setIsSwipingState(false);
                swipedItemIdRef.current = null;
                swipeStartX.current = 0;
                swipeStartClientY.current = 0;
                swipeStartPositionX.current = 0;
                // itemPositions для этого элемента будет удален в useEffect выше
            }
        }

        // Дополнительная проверка: если шел свайп, но элемент был удален извне
        if (isSwipingState && swipedItemIdRef.current) {
            const swipingItemExists = cart.some((item) => {
                const currentItemId = `${item.product?.id || 'no_product'}-${item.parameter?.id || 'no_param'}`;
                return currentItemId === swipedItemIdRef.current;
            });
            if (!swipingItemExists) {
                setIsSwipingState(false);
                swipedItemIdRef.current = null;
                swipeStartX.current = 0;
                swipeStartClientY.current = 0;
                swipeStartPositionX.current = 0;
                // itemPositions для этого элемента будет удален в useEffect выше
            }
        }
    }, [cart, openItemId, isSwipingState]); // Зависит от корзины, открытого элемента и состояния свайпа

    return (
        <Container>
            {cart.map((item) => {
                const itemId = `${item.product?.id || 'no_product'}-${item.parameter?.id || 'no_param'}`;

                // Получаем текущую позицию элемента из состояния itemPositions
                const currentItemTranslateX = itemPositions[itemId] ?? 0;

                // Проп $isSwiping для этого конкретного элемента
                const isThisItemSwiping = isSwipingState && swipedItemIdRef.current === itemId;

                return (
                    <SwipeContainer
                        key={itemId}
                        onTouchStart={(e) => handleTouchStart(e, itemId)}
                        onTouchMove={(e) => handleTouchMove(e, itemId)}
                        onTouchEnd={(e) => handleTouchEnd(e, itemId)}
                        onTouchCancel={(e) => handleTouchCancel(e, itemId)}
                    >
                        <SwipedItem
                            // Transform теперь всегда берется из состояния itemPositions
                            $transformX={currentItemTranslateX}
                            // Проп $isSwiping включает/отключает transition
                            $isSwiping={isThisItemSwiping}
                            data-item-id={itemId}
                            onClick={(e) => handleItemClick(e as React.MouseEvent, itemId)}
                        >
                            {/* Содержимое элемента */}
                            {item.product.image?.url && <ItemImage src={item.product.image.url} alt="" />}
                            <ItemDetails>
                                <ItemName>{item.product.name}</ItemName>
                                <ItemPrice>
                                    {getItemAmount(item)} {RUBLE_SYMBOL}
                                </ItemPrice>
                            </ItemDetails>
                            <QuantityWrapper>
                                <QuantityInput
                                    quantity={item.quantity}
                                    onChange={getHandleChangeQuantity(item)}
                                    size="sm"
                                />
                            </QuantityWrapper>
                        </SwipedItem>

                        <DeleteButton onClick={() => handleDeleteItem(item)}>
                            <Trash size={24} />
                        </DeleteButton>
                    </SwipeContainer>
                );
            })}
        </Container>
    );
};
