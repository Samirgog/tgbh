import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import { LocateIcon, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import styled from 'styled-components';

import { DrawerAddressSearch } from './DrawerAddressSearch';

const MapWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
`;

const StyledAddress = styled.div`
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 16px;
    z-index: 1001;
    max-width: 90vw;
    text-align: center;
`;

const ConfirmButton = styled.button`
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    background: #4caf50;
    color: white;
    padding: 12px 30px;
    font-size: 18px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    z-index: 1001;
`;

const SearchButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background: white;
    border: none;
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
    cursor: pointer;
`;

const LocateButton = styled.button`
    position: absolute;
    bottom: 100px;
    right: 20px;
    background: white;
    border: none;
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
    cursor: pointer;
`;

const customIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});

const cleanAddress = (raw: string) => {
    const parts = raw
        .split(',')
        .map((p) => p.trim())
        .filter((p) => !p.match(/Россия|Украина|Беларусь|Республика/i) && !/^\d{6,}/.test(p));
    return parts.join(', ');
};

const fetchAddress = async (lat: number, lon: number): Promise<string> => {
    try {
        const response = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Token 302431e17282700ee82dbd56536c819b3c4ca721',
            },
            body: JSON.stringify({ lat, lon, radius_meters: 50 }),
        });
        const data = await response.json();
        if (data.suggestions?.length) {
            return cleanAddress(data.suggestions[0].value);
        }
        return 'Адрес не найден';
    } catch (e) {
        console.error('Ошибка геокодирования', e);
        return 'Ошибка определения адреса';
    }
};

const FlyToPosition = ({ position }: { position: [number, number] | null }) => {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.flyTo(position, 17, { duration: 1 });
        }
    }, [position]);
    return null;
};

const LocationHandler = ({ onChange }: { onChange: (pos: [number, number], address: string) => void }) => {
    const map = useMapEvents({
        click: async (e) => {
            const { lat, lng } = e.latlng;
            const addr = await fetchAddress(lat, lng);
            onChange([lat, lng], addr);
        },
    });
    return null;
};

export const Map = () => {
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [address, setAddress] = useState('Загрузка...');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

    const initOnce = useRef(false);

    const setLocation = async (lat: number, lon: number) => {
        const addr = await fetchAddress(lat, lon);
        setPosition([lat, lon]);
        setAddress(addr);
    };

    const detectUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                setLocation(latitude, longitude);
            },
            (err) => {
                console.error('Геолокация не разрешена', err);
                setAddress('Геолокация не разрешена');
            },
        );
    };

    useEffect(() => {
        if (!initOnce.current) {
            initOnce.current = true;
            detectUserLocation();
        }
    }, []);

    const handleSelectAddress = (lat: number, lon: number, addr: string) => {
        setPosition([lat, lon]);
        setAddress(cleanAddress(addr));
    };

    return (
        <MapWrapper>
            <DrawerAddressSearch
                open={isOpenDrawer}
                onSelect={handleSelectAddress}
                onClose={() => setIsOpenDrawer(false)}
            />
            <StyledAddress>{address}</StyledAddress>
            <SearchButton onClick={() => setIsOpenDrawer(true)}>
                <Search size={20} />
            </SearchButton>
            <LocateButton onClick={detectUserLocation}>
                <LocateIcon size={20} />
            </LocateButton>
            <MapContainer
                center={position || [55.751244, 37.618423]}
                zoom={13}
                style={{ width: '100%', height: '100%' }}
                zoomControl={false}
                attributionControl={false}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationHandler
                    onChange={(pos, addr) => {
                        setPosition(pos);
                        setAddress(addr);
                    }}
                />
                {position && <Marker position={position} icon={customIcon} />}
                <FlyToPosition position={position} />
            </MapContainer>
            <ConfirmButton onClick={() => alert(`Адрес выбран: ${address}`)}>Выбрать этот адрес</ConfirmButton>
        </MapWrapper>
    );
};
