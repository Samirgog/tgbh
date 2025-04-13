import { ShoppingCart } from 'lucide-react';
import { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

import { mockBusiness } from '@/__mock__/business';
import { Text } from '@/Components/@ui-kit';
import { StoreCatalog } from '@/Components/Common/StoreCatalog';
import { DrawerProduct } from '@/Components/Consumer/Store/DrawerProduct';
import { useControlProduct } from '@/Components/Consumer/Store/useControlProduct';
import { Product } from '@/Models/Catalog';

const Container = styled.div`
    display: flex;
    position: relative;
`;

const Cart = styled.button`
    position: fixed;
    bottom: 16px;
    right: 16px;
    background: #ba1924;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 24px;
    cursor: pointer;
    transition: 0.2s;
    z-index: 1000;
    display: flex;
    align-items: flex-end;
    gap: ${({ theme }) => theme.spacing(1)};

    &:hover {
        background: #a8161f;
    }
`;

export const Store: FunctionComponent = () => {
    const [cart, setCart] = useState<Product[]>([]);
    const { product, isOpenDrawer, openProductDrawer, closeProductDrawer } = useControlProduct();

    const handleAddToCart = (product: Product) => {
        if (product.parameters?.length) {
            openProductDrawer(product);
        } else {
            setCart((prev) => [...prev, product]);
        }
    };

    const handleClickCart = () => {
        console.log({ cart });
    };

    return (
        <>
            <DrawerProduct open={isOpenDrawer} onClose={closeProductDrawer} product={product} />
            <Container>
                <StoreCatalog business={mockBusiness} onClickProduct={handleAddToCart} />
                {cart?.length > 0 && (
                    <Cart onClick={handleClickCart}>
                        <ShoppingCart size={20} />
                        <Text size="b1" color="white" weight="bold">
                            {cart.reduce((acc, prev) => acc + (prev?.price?.amount ?? 0), 0)}
                        </Text>
                    </Cart>
                )}
            </Container>
        </>
    );
};
