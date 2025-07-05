import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Drawer, Selector, Text, Title } from '@/Components/@ui-kit';
import { QuantityInput } from '@/Components/Common/QuantityInput';
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
    onAddToCart?: (params: { quantity: number; parameter?: Parameter }) => void;
};

export const DrawerProduct: FC<Props> = ({ open, onClose, product, onAddToCart }) => {
    const [selectedParameter, setSelectedParameter] = useState<Parameter | undefined>(() => product?.parameters?.[0]);
    const [quantity, setQuantity] = useState<number>(1);

    const handleAddToCart = () => {
        onAddToCart?.({ parameter: selectedParameter, quantity: quantity ?? 0 });
    };

    useEffect(() => {
        if (!open) {
            setQuantity(1);
            setSelectedParameter(undefined);
        }
    }, [open]);

    useEffect(() => {
        if (open && product?.parameters) {
            setSelectedParameter(product.parameters[0]);
        }
    }, [open, product]);

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
                <QuantityInput quantity={quantity} onChange={setQuantity} />
                <PriceWrapper>
                    <Title size="h4" color="accent" weight="bold">
                        {selectedParameter
                            ? `${(selectedParameter.price?.amount ?? 0) * quantity} ${selectedParameter.price?.currency}`
                            : `${(product?.price?.amount ?? 0) * quantity} ${product?.price?.currency}`}
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
