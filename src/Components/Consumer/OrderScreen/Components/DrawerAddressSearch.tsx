import { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

import { Drawer } from '@/Components/@ui-kit';

const Content = styled.div`
    padding: 20px;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 12px;
    font-size: 16px;
`;

const SuggestionsList = styled.ul`
    list-style: none;
    margin-top: 10px;
    padding: 0;
`;

const SuggestionItem = styled.li`
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
    &:hover {
        background-color: #f5f5f5;
    }
`;

interface Suggestion {
    value: string;
    data: {
        geo_lat: string;
        geo_lon: string;
    };
}

type Props = {
    open: boolean;
    onSelect: (lat: number, lon: number, address: string) => void;
    onClose: () => void;
};

export const DrawerAddressSearch: FunctionComponent<Props> = ({ open, onSelect, onClose }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length < 3) {
            setSuggestions([]);
            return;
        }

        const response = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Token 302431e17282700ee82dbd56536c819b3c4ca721',
            },
            body: JSON.stringify({ query: value }),
        });
        const data = await response.json();
        setSuggestions(data.suggestions || []);
    };

    return (
        <Drawer open={open} onClose={onClose}>
            <Content onClick={(e) => e.stopPropagation()}>
                <Input placeholder="Введите адрес..." value={query} onChange={handleInput} />
                <SuggestionsList>
                    {suggestions.map((s, idx) => (
                        <SuggestionItem
                            key={idx}
                            onClick={() => {
                                const lat = parseFloat(s.data.geo_lat);
                                const lon = parseFloat(s.data.geo_lon);
                                onSelect(lat, lon, s.value);
                                onClose();
                            }}
                        >
                            {s.value}
                        </SuggestionItem>
                    ))}
                </SuggestionsList>
            </Content>
        </Drawer>
    );
};
