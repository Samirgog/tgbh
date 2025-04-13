import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { FC, useState } from 'react';
import styled from 'styled-components';

import { Drawer, Selector, Text, Title } from '@/Components/@ui-kit';
import { Parameter, Product } from '@/Models/Catalog';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(2)};
    height: 100%;
`;

const ProductImage = styled.img`
    width: 240px;
    height: 240px;
    object-fit: cover;
    border-radius: 100%;
    margin: 16px 0;
`;

const Subtitle = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    margin: 8px 0 16px;
`;

const QuantityWrapper = styled.div`
    display: flex;
    background: #f3eae7;
    border-radius: 999px;
    align-items: center;
    overflow: hidden;
`;

const QuantityButton = styled.button`
    background: transparent;
    border: none;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const QuantityValue = styled.div`
    background: white;
    padding: 10px 20px;
    font-weight: bold;
    font-size: 16px;
`;

const PriceWrapper = styled.div`
    margin: 16px 0 8px;
`;

const AddToCartButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    background: #ba1924;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 24px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: 0.2s;
    margin-top: auto;

    &:hover {
        background: #a8161f;
    }
`;

type Props = {
    open: boolean;
    onClose: () => void;
    product?: Product;
    onAddToCart?: (params: { parameter: Parameter; quantity: number }) => void;
};

export const DrawerProduct: FC<Props> = ({ open, onClose, product, onAddToCart }) => {
    const [selectedParameter, setSelectedParameter] = useState<Parameter | undefined>(product?.parameters?.[0]);
    const [quantity, setQuantity] = useState<number>(1);

    const handleAddToCart = () => {
        if (selectedParameter) {
            onAddToCart?.({ parameter: selectedParameter, quantity });
        } else {
            onClose();
        }
    };

    return (
        <Drawer open={open} onClose={onClose}>
            <Wrapper>
                <Title size="h2" weight="bold">
                    {product?.name}
                </Title>
                <Subtitle>
                    <Text size="b1" color="secondary">
                        {product?.description}
                    </Text>
                </Subtitle>
                <ProductImage src={product?.image?.url ?? ''} />
                <Selector
                    options={product?.parameters?.map((param) => param.text) ?? []}
                    selected={selectedParameter?.text ?? ''}
                    onSelect={(param) =>
                        setSelectedParameter(product?.parameters?.find((parameter) => parameter.text === param))
                    }
                />
                <QuantityWrapper>
                    <QuantityButton onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                        <Minus size={16} />
                    </QuantityButton>
                    <QuantityValue>{quantity}</QuantityValue>
                    <QuantityButton onClick={() => setQuantity((q) => q + 1)}>
                        <Plus size={16} />
                    </QuantityButton>
                </QuantityWrapper>
                <PriceWrapper>
                    <Title size="h4" color="accent" weight="bold">
                        {selectedParameter?.price?.amount} {selectedParameter?.price?.currency}
                    </Title>
                </PriceWrapper>
                <AddToCartButton onClick={handleAddToCart}>
                    <ShoppingCart size={20} />
                    Добавить
                </AddToCartButton>
            </Wrapper>
        </Drawer>
    );
};
