// import { ShoppingCart } from 'lucide-react';
// import { FunctionComponent } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import { useShallow } from 'zustand/react/shallow';
//
// import { mockBusiness } from '@/__mock__/business';
// import { Text } from '@/Components/@ui-kit';
// import { StoreCatalog } from '@/Components/Common/StoreCatalog';
// import { DrawerProduct } from '@/Components/Consumer/Store/DrawerProduct';
// import { useControlProduct } from '@/Components/Consumer/Store/useControlProduct';
// import { RoutesConsumer } from '@/Enums';
// import { Parameter, Product } from '@/Models/Catalog';
// import { useConsumerStore } from '@/Store/Consumer';
//
// const Container = styled.div`
//     display: flex;
//     position: relative;
// `;
//
// const Cart = styled.button`
//     position: fixed;
//     bottom: 16px;
//     right: 16px;
//     background: #ba1924;
//     color: white;
//     border: none;
//     padding: 12px 24px;
//     border-radius: 24px;
//     cursor: pointer;
//     transition: 0.2s;
//     z-index: 1000;
//     display: flex;
//     align-items: flex-end;
//     gap: ${({ theme }) => theme.spacing(1)};
//
//     &:hover {
//         background: #a8161f;
//     }
// `;
//
// export const Store: FunctionComponent = () => {
//     const navigate = useNavigate();
//     const { cart, addCartItem, removeCartItem, getTotal } = useConsumerStore(
//         useShallow(({ cart, addCartItem, removeCartItem, getTotal }) => ({
//             cart,
//             addCartItem,
//             removeCartItem,
//             getTotal,
//         })),
//     );
//     const { product, isOpenDrawer, openProductDrawer, closeProductDrawer } = useControlProduct();
//
//     const handleClickProduct = (product: Product) => {
//         openProductDrawer(product);
//     };
//
//     const handleAddToCart = ({ quantity, parameter }: { quantity: number; parameter?: Parameter }) => {
//         if (!product) {
//             return;
//         }
//
//         if (quantity <= 0) {
//             removeCartItem({ productId: product.id, parameterId: parameter?.id });
//         } else {
//             addCartItem({ product, quantity, parameter });
//         }
//
//         closeProductDrawer();
//     };
//
//     const handleClickCart = () => {
//         navigate(RoutesConsumer.ORDER);
//     };
//
//     const total = getTotal();
//
//     return (
//         <>
//             <DrawerProduct
//                 open={isOpenDrawer}
//                 onClose={closeProductDrawer}
//                 product={product}
//                 onAddToCart={handleAddToCart}
//             />
//             <Container>
//                 <StoreCatalog business={mockBusiness} onClickProduct={handleClickProduct} />
//                 {cart?.length > 0 && (
//                     <Cart onClick={handleClickCart}>
//                         <ShoppingCart size={20} />
//                         <Text size="b1" color="white" weight="bold">
//                             {total.amount} {total.currency}
//                         </Text>
//                     </Cart>
//                 )}
//             </Container>
//         </>
//     );
// };
import React from 'react';

export const Store = () => {
    return <div></div>;
};
