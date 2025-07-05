import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useShallow } from 'zustand/react/shallow';

import { Input, Title } from '@/Components/@ui-kit';
import { AddressMap } from '@/Components/Consumer/OrderScreen/Components/AddressMap';
import { CartItemsList } from '@/Components/Consumer/OrderScreen/Components/CartItemsList';
import { PaymentType, ReceiveWays, RoutesConsumer } from '@/Enums';
import { Address } from '@/Models/Catalog';
import { useConsumerStore } from '@/Store/Consumer';

export const OrderScreenContainer = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 24px; // Пространство между секциями
    background-color: #fff; // Используем переменные темы TG
    color: #333; // Используем переменные темы TG
    min-height: 100vh; // Чтобы занимал всю высоту
`;

export const OrderScreen: React.FC = () => {
    const navigate = useNavigate();
    const { cart, getTotal } = useConsumerStore(useShallow(({ cart, getTotal }) => ({ cart, getTotal })));
    const [deliveryMethod, setDeliveryMethod] = useState<ReceiveWays>(ReceiveWays.PICKUP);
    const [paymentMethod, setPaymentMethod] = useState<PaymentType>(PaymentType.SBP);
    const [deliveryAddress, setDeliveryAddress] = useState<Address | null>(null);
    const [deliveryCost, setDeliveryCost] = useState<number>(0); // Рассчитывается на основе адреса, метода доставки

    // Эффект для расчета стоимости доставки или других данных при изменении метода доставки/адреса
    useEffect(() => {
        if (deliveryMethod === 'delivery') {
            // Здесь должна быть логика расчета стоимости доставки
            // Например, запрос к API магазина на основе deliveryAddress
            // Для примера просто ставим фикс. цену или 0
            const calculatedCost = deliveryAddress ? 250 : 0; // Пример: 250 руб, если адрес выбран
            setDeliveryCost(calculatedCost);
        } else {
            setDeliveryCost(0); // Самовывоз - доставка 0
            setDeliveryAddress(null); // Сбрасываем адрес, если перешли на самовывоз
        }
    }, [deliveryMethod, deliveryAddress]); // Зависимости от метода и адреса

    const handleClickSelectAddress = () => {
        navigate(RoutesConsumer.ADDRESS_MAP);
    };
    const handlePlaceOrder = () => {
        // Логика оформления заказа
        const orderData = {
            items: cart,
            delivery: {
                method: deliveryMethod,
                address: deliveryAddress, // Будет null при самовывозе
                cost: deliveryCost,
            },
            payment: {
                method: paymentMethod,
                // Дополнительные данные для оплаты (например, токен для онлайн оплаты)
            },
            total: (getTotal()?.amount ?? 0) + deliveryCost,
        };

        console.log('Оформление заказа:', orderData);

        // Здесь должна быть отправка данных на ваш бэкенд
        // и обработка ответа (например, переход на страницу оплаты)

        // Пример: интеграция с Telegram Web App для оплаты (если оплата онлайн)
        // if (paymentMethod === 'online_card' || paymentMethod === 'sbp') {
        //    if (window.Telegram && window.Telegram.WebApp) {
        //        Telegram.WebApp.openInvoice(invoiceUrl, (status) => {
        //             console.log('Invoice status:', status);
        //             // Обработка статуса оплаты
        //        });
        //    }
        // }
    };

    const handleAddressSelection = useCallback((address: { value: string; coords: [number, number] } | null) => {
        if (address) {
            // Обновляем state адреса в OrderScreen
            setDeliveryAddress({ value: address.value, coords: address.coords });
            console.log('Выбран адрес:', address);
            // Здесь может быть логика расчета стоимости доставки на основе адреса
        } else {
            setDeliveryAddress(null);
        }
    }, []);

    // Проверка, можно ли оформить заказ
    const isOrderValid =
        deliveryMethod === ReceiveWays.PICKUP || (deliveryMethod === ReceiveWays.DELIVERY && deliveryAddress?.coords);

    return (
        <OrderScreenContainer>
            <Title size="h2">Оформление заказа</Title>

            <CartItemsList />

            {/*<AddressMap*/}
            {/*    initialCoords={deliveryAddress?.coords} // Передаем текущие координаты в карту*/}
            {/*    initialAddress={deliveryAddress?.value} // Передаем текущий адрес в карту*/}
            {/*    onAddressSelect={handleAddressSelection} // Callback при выборе адреса*/}
            {/*    storeAddressInParent={false} // Говорим AddressMap хранить состояние адреса в родителе*/}
            {/*/>*/}

            <Input placeholder="Выбрать адрес" onClick={handleClickSelectAddress} />

            {/*<Section>*/}
            {/*    <DeliveryMethodSelector selectedMethod={deliveryMethod} onSelectMethod={setDeliveryMethod} />*/}
            {/*</Section>*/}

            {/*/!* Этот блок отображается только при доставке *!/*/}
            {/*{deliveryMethod === ReceiveWays.DELIVERY && (*/}
            {/*    <Section>*/}
            {/*        <AddressInputWithMap*/}
            {/*            onAddressChange={setDeliveryAddress}*/}
            {/*            initialAddress={deliveryAddress}*/}
            {/*            deliveryMethod={deliveryMethod} // Передаем для условного рендеринга внутри компонента*/}
            {/*        />*/}
            {/*    </Section>*/}
            {/*)}*/}

            {/*<Section>*/}
            {/*    <PaymentMethodSelector selectedMethod={paymentMethod} onSelectMethod={setPaymentMethod} />*/}
            {/*</Section>*/}

            {/*<Section>*/}
            {/*    <OrderSummary items={cart} deliveryCost={deliveryCost} />*/}
            {/*</Section>*/}

            {/*<Button color="general" onClick={handlePlaceOrder} disabled={!isOrderValid}>*/}
            {/*    Оформить заказ*/}
            {/*</Button>*/}

            {/* Здесь можно добавить секцию с комментариями к заказу, контактными данными и т.д. */}
        </OrderScreenContainer>
    );
};
