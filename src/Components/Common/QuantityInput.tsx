import { Minus, Plus } from 'lucide-react';
import { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

const QuantityWrapper = styled.div`
    display: flex;
    background: #f3eae7;
    border-radius: 999px;
    align-items: center;
    overflow: hidden;
`;

const QuantityButton = styled.button<{ $size: 'sm' | 'lg' }>`
    background: transparent;
    border: none;
    padding: ${({ $size }) => ($size === 'sm' ? '7px 12px' : '10px 16px')};
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const QuantityValue = styled.div<{ $size: 'sm' | 'lg' }>`
    background: white;
    padding: ${({ $size }) => ($size === 'sm' ? '7px 14px' : '10px 20px')};
    font-weight: bold;
    font-size: ${({ $size }) => ($size === 'sm' ? '12px' : '16px')};
`;

type Props = {
    quantity?: number;
    onChange?: (value: number) => void;
    size?: 'sm' | 'lg';
};
export const QuantityInput: FunctionComponent<Props> = ({ quantity = 0, onChange, size = 'lg' }) => {
    const [localQuantity, setLocalQuantity] = useState<number>(quantity);

    const handleIncrease = () => {
        const nextQuantity = Math.max(0, localQuantity + 1);

        setLocalQuantity(nextQuantity);
        onChange?.(nextQuantity);
    };

    const handleDecrease = () => {
        const nextQuantity = Math.max(0, localQuantity - 1);

        setLocalQuantity(nextQuantity);
        onChange?.(nextQuantity);
    };

    const iconSize = size === 'sm' ? 10 : 16;

    return (
        <QuantityWrapper>
            <QuantityButton $size={size} onClick={handleDecrease}>
                <Minus size={iconSize} />
            </QuantityButton>
            <QuantityValue $size={size}>{localQuantity}</QuantityValue>
            <QuantityButton $size={size} onClick={handleIncrease}>
                <Plus size={iconSize} />
            </QuantityButton>
        </QuantityWrapper>
    );
};
