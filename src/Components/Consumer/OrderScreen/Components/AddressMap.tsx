import 'leaflet/dist/leaflet.css'; // Базовые стили Leaflet

import L from 'leaflet'; // Импорт Leaflet для кастомной иконки маркера
import { Trash } from 'lucide-react'; // Или другая иконка
import { Search } from 'lucide-react'; // Иконка для поиска
import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import styled from 'styled-components';

import { debounce } from '@/Utils/debounce';

export const MapWrapper = styled.div`
    position: relative; // Для позиционирования кнопки поиска и оверлея
    width: 100%;
    /* Высота для мини-приложения на весь экран */
    /* Можно использовать calc(100vh - ВысотаВерхнегоБара) или просто 100vh,
       в зависимости от структуры Mini App */
    height: 100vh; // Занимает всю высоту вьюпорта

    .leaflet-container {
        /* Стиль для контейнера Leaflet, чтобы он занимал 100% родителя */
        width: 100%;
        height: 100%;
    }
`;

// Styled версия MapContainer
export const MapContainerStyled = styled(MapContainer)`
    /* Дополнительные стили для MapContainer, если нужны */
`;

export const SearchButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1000; // Убедимся, что кнопка над картой
    background-color: var(--tg-theme-secondary-bg-color, #ffffff);
    color: var(--tg-theme-text-color, #333);
    border: none;
    border-radius: 50%; // Круглая форма
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: background-color 0.1s ease;

    &:hover {
        background-color: var(--tg-theme-bg-color, #f0f0f0);
    }

    svg {
        width: 24px;
        height: 24px;
    }
`;

export const SearchOverlay = styled.div`
    position: fixed; // Или absolute, чтобы перекрыть весь MapWrapper
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--tg-theme-bg-color, #f0f0f0); // Фон оверлея
    z-index: 2000; // Убедимся, что оверлей над кнопкой поиска
    padding: 16px;
    display: flex;
    flex-direction: column;
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: var(--tg-theme-hint-color, #666);
    cursor: pointer;
    padding: 5px;

    &:hover {
        color: var(--tg-theme-text-color, #333);
    }

    svg {
        width: 24px;
        height: 24px;
    }
`;

export const SearchInput = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 1em;
    border: 1px solid var(--tg-theme-secondary-bg-color, #ccc);
    border-radius: 4px;
    margin-bottom: 10px;
    outline: none;
    background-color: var(--tg-theme-secondary-bg-color, #ffffff);
    color: var(--tg-theme-text-color, #333);

    &:focus {
        border-color: var(--tg-theme-accent-text-color, #007bff);
    }
`;

export const SuggestionsList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    background-color: var(--tg-theme-secondary-bg-color, #ffffff);
    border: 1px solid var(--tg-theme-secondary-bg-color, #ccc);
    border-radius: 4px;
    max-height: 50%; // Ограничиваем высоту списка
    overflow-y: auto;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const SuggestionItem = styled.li`
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid var(--tg-theme-bg-color, #eee);

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: var(--tg-theme-bg-color, #f0f0f0);
    }
`;

// Объявляем ymaps глобально для доступа к API
declare const ymaps: any;

// Интерфейс для выбранного адреса
interface SelectedAddress {
    value: string; // Строковое представление адреса
    coords: [number, number]; // [широта, долгота] в формате Leaflet (lat, lng)
}

// Интерфейс для элемента из Яндекс.Suggest API
interface YandexSuggestItem {
    displayName: string;
    value: string; // Полный текст адреса
}

// Интерфейс для Yandex Geocode Result Item
interface YandexGeocodeResultItem {
    geometry: {
        getCoordinates(): [number, number]; // [latitude, longitude]
    };
    getAddressLine(): string;
}

// Удаляем и переопределяем дефолтную иконку Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface AddressMapProps {
    initialCoords?: [number, number]; // Начальные координаты [широта, долгота]
    initialAddress?: string; // Начальный адрес (строка)
    onAddressSelect: (address: SelectedAddress | null) => void; // Callback при выборе адреса
    storeAddressInParent?: boolean; // Флаг, чтобы сохранять выбранный адрес в родительском компоненте
}

export const AddressMap: FunctionComponent<AddressMapProps> = ({
    initialCoords,
    initialAddress,
    onAddressSelect,
    storeAddressInParent = false,
}) => {
    // Используем внутреннее или внешнее состояние в зависимости от флага
    const [selectedCoordsInternal, setSelectedCoordsInternal] = useState<[number, number] | null>(
        storeAddressInParent ? initialCoords || null : null,
    );
    const [selectedAddressInternal, setSelectedAddressInternal] = useState<string | null>(
        storeAddressInParent ? initialAddress || null : null,
    );

    // Используем объединенные координаты и адрес для рендера и логики
    const selectedCoords = storeAddressInParent ? initialCoords || null : selectedCoordsInternal;
    const selectedAddress = storeAddressInParent ? initialAddress || null : selectedAddressInternal;

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState(selectedAddress || '');
    const [addressSuggestions, setAddressSuggestions] = useState<YandexSuggestItem[]>([]);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const MapClickHandler = () => {
        const map = useMapEvents({
            click: async (e) => {
                const { lat, lng } = e.latlng;
                const coords: [number, number] = [lat, lng];

                // Обновляем маркер немедленно
                if (storeAddressInParent) {
                    // Обновляем только координаты в родительском состоянии
                    onAddressSelect({ value: selectedAddress || '', coords: coords }); // Адрес пока неизвестен
                } else {
                    // Иначе, обновляем внутреннее состояние
                    setSelectedCoordsInternal(coords);
                    setSelectedAddressInternal(null); // Сбрасываем адрес, пока идет геокодирование
                    onAddressSelect({ value: '', coords: coords }); // Уведомляем родителя о координатах
                }

                // Выполняем обратное геокодирование (координаты -> адрес)
                if (typeof ymaps !== 'undefined' && ymaps.geocode) {
                    try {
                        const res = await ymaps.geocode(coords);
                        const firstGeoObject: YandexGeocodeResultItem = res.geoObjects.get(0);
                        if (firstGeoObject) {
                            const addressValue = firstGeoObject.getAddressLine();
                            if (storeAddressInParent) {
                                // Обновляем полный адрес в родительском состоянии
                                onAddressSelect({ value: addressValue, coords: coords });
                            } else {
                                // Иначе, обновляем внутреннее состояние
                                setSelectedAddressInternal(addressValue);
                                onAddressSelect({ value: addressValue, coords: coords });
                            }
                        } else {
                            // Если адрес не найден, используем координаты
                            const addressValue = `Координаты: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
                            if (storeAddressInParent) {
                                onAddressSelect({ value: addressValue, coords: coords });
                            } else {
                                setSelectedAddressInternal(addressValue);
                                onAddressSelect({ value: addressValue, coords: coords });
                            }
                            console.warn('Не удалось получить адрес для кликнутых координат.');
                        }
                    } catch (error) {
                        console.error('Ошибка обратного геокодирования:', error);
                        const addressValue = `Ошибка геокодирования: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
                        if (storeAddressInParent) {
                            onAddressSelect({ value: addressValue, coords: coords });
                        } else {
                            setSelectedAddressInternal(addressValue);
                            onAddressSelect({ value: addressValue, coords: coords });
                        }
                    }
                } else {
                    const addressValue = `API Геокодера недоступен: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
                    if (storeAddressInParent) {
                        onAddressSelect({ value: addressValue, coords: coords });
                    } else {
                        setSelectedAddressInternal(addressValue);
                        onAddressSelect({ value: addressValue, coords: coords });
                    }
                    console.warn('Yandex Maps API (geocode module) не загружен.');
                }
            },
        });
        return null;
    };

    // Хук для центрирования карты и установки зума
    const MapViewUpdater = () => {
        const map = useMap();

        // Центрируем на выбранных координатах с зумом 15
        useEffect(() => {
            if (selectedCoords) {
                map.setView(selectedCoords, 15);
            }
            // Этот эффект должен зависеть только от selectedCoords.
            // map объект, возвращаемый useMap(), стабилен для данного экземпляра MapContainer.
        }, [selectedCoords]);

        // Центрируем на начальных координатах при первом рендере или если нет выбранных
        useEffect(() => {
            // Если есть initialCoords и нет выбранных, центрируем на них
            if (initialCoords && !selectedCoords) {
                map.setView(initialCoords, 10); // Начальный зум
            } else if (!initialCoords && !selectedCoords) {
                // Если нет ни начальных, ни выбранных, центрируем на Москве
                map.setView([55.7558, 37.6173], 10);
            }
            // Зависимости: initialCoords, selectedCoords
        }, [initialCoords, selectedCoords]);

        return null;
    };

    // Функция поиска адресов с debounce
    const searchAddresses = useCallback(
        debounce(async (query: string) => {
            if (query.length < 3 || typeof ymaps === 'undefined' || !ymaps.suggest) {
                setAddressSuggestions([]);
                return;
            }
            try {
                const res = await ymaps.suggest(query);
                const formattedSuggestions: YandexSuggestItem[] = res.map((item: any) => ({
                    displayName: item.displayName,
                    value: item.value,
                }));
                setAddressSuggestions(formattedSuggestions);
            } catch (error) {
                console.error('Ошибка поиска адресов:', error);
                setAddressSuggestions([]);
            }
        }, 300),
        [],
    );

    // Обработчик ввода в поле поиска
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchText(value);
        searchAddresses(value);
    };

    // Обработчик выбора адреса из списка саггестов
    const handleSuggestionClick = async (suggestion: YandexSuggestItem) => {
        setSearchText(suggestion.value);
        setAddressSuggestions([]); // Скрываем список саггестов

        // Получаем точные координаты (прямое геокодирование)
        if (typeof ymaps !== 'undefined' && ymaps.geocode) {
            try {
                const res = await ymaps.geocode(suggestion.value);
                const firstGeoObject: YandexGeocodeResultItem = res.geoObjects.get(0);
                if (firstGeoObject) {
                    const coords: [number, number] = firstGeoObject.geometry.getCoordinates();
                    const addressValue = firstGeoObject.getAddressLine();

                    if (storeAddressInParent) {
                        onAddressSelect({ value: addressValue, coords: coords });
                    } else {
                        setSelectedCoordsInternal(coords);
                        setSelectedAddressInternal(addressValue);
                        onAddressSelect({ value: addressValue, coords: coords });
                    }

                    setIsSearchOpen(false); // Закрываем оверлей
                } else {
                    console.warn('Не удалось геокодировать выбранный адрес:', suggestion.value);
                    // Уведомить пользователя
                }
            } catch (error) {
                console.error('Ошибка геокодирования выбранного адреса:', error);
                // Уведомить пользователя
            }
        } else {
            console.warn('Yandex Maps API (geocode module) не загружен.');
        }
    };

    // Эффект для сброса саггестов при закрытии поиска и фокус на инпуте при открытии
    useEffect(() => {
        if (!isSearchOpen) {
            setAddressSuggestions([]);
            // setSearchText(''); // Опционально сбросить текст
        } else {
            if (selectedAddress) {
                setSearchText(selectedAddress);
                // searchAddresses(selectedAddress); // Можно сразу искать по текущему адресу
            } else {
                setSearchText(''); // Если адреса нет, очищаем поле при открытии поиска
            }
            // Фокусируем поле ввода с небольшой задержкой
            const timer = setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
            return () => clearTimeout(timer); // Очистка таймера
        }
    }, [isSearchOpen, selectedAddress, searchAddresses]);

    return (
        <MapWrapper>
            {/* Карта */}
            {/* Добавляем уникальный и постоянный ключ для MapContainerStyled */}
            <MapContainerStyled
                key="address-map-container" // <-- Добавьте этот ключ
                center={selectedCoords || initialCoords || [55.7558, 37.6173]} // Центр карты по умолчанию (Москва)
                zoom={selectedCoords ? 15 : initialCoords ? 10 : 10} // Начальный зум
                scrollWheelZoom={true}
                attributionControl={true} // Показываем стандартную атрибуцию Leaflet
                // Можно временно отключить атрибуцию, если проблема с флагом только там
                // attributionControl={false}
            >
                {/* Слой с тайлами OpenStreetMap (минималистичный стиль) */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    // Альтернативы (для проверки проблемы с флагом и языком):
                    // OpenStreetMap Default: url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // Часто с локальными названиями
                    // CartoDB DarkMatter: url="https://{s}.basemaps.cartocdn.com/dark_matter_all/{z}/{x}/{y}{r}.png"
                />

                {/* Маркер выбранного адреса */}
                {/* Добавляем key для принудительного обновления маркера при смене координат */}
                {selectedCoords && <Marker key={selectedCoords.join(',')} position={selectedCoords} />}

                {/* Обработчик кликов по карте */}
                <MapClickHandler />

                {/* Хук для обновления вида карты */}
                <MapViewUpdater />
            </MapContainerStyled>

            {/* Кнопка поиска */}
            <SearchButton onClick={() => setIsSearchOpen(true)}>
                <Search size={24} />
            </SearchButton>

            {/* Оверлей поиска */}
            {isSearchOpen && (
                <SearchOverlay>
                    {/* Кнопка закрытия оверлея */}
                    <CloseButton onClick={() => setIsSearchOpen(false)}>
                        <Trash size={24} /> {/* Или иконка крестика */}
                    </CloseButton>

                    <h2>Найти адрес</h2>
                    <SearchInput
                        ref={searchInputRef}
                        type="text"
                        placeholder="Введите адрес..."
                        value={searchText}
                        onChange={handleSearchInputChange}
                    />
                    {addressSuggestions.length > 0 && (
                        <SuggestionsList>
                            {addressSuggestions.map((suggestion, index) => (
                                <SuggestionItem
                                    key={suggestion.value + index} // Уникальный ключ
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion.displayName}
                                </SuggestionItem>
                            ))}
                        </SuggestionsList>
                    )}
                </SearchOverlay>
            )}
        </MapWrapper>
    );
};
