import { useState } from 'react';

import { Product } from '@/Models/Catalog';

export const useControlProduct = () => {
    const [isOpenDrawer, setOpenDrawer] = useState(false);
    const [product, setProduct] = useState<Product>();

    const openProductDrawer = (product?: Product) => {
        setProduct(product);
        setOpenDrawer(true);
    };

    const closeProductDrawer = () => {
        setOpenDrawer(false);
        setProduct(undefined);
    };

    return { product, isOpenDrawer, openProductDrawer, closeProductDrawer };
};
