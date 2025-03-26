import { useState } from 'react';

import { Product } from '@/Models/Catalog';

export const useControlProduct = () => {
    const [isOpenDrawer, setOpenDrawer] = useState(false);
    const [product, setProduct] = useState<Product>();
    const [categoryId, setCategoryId] = useState<string | undefined>();

    const openProductDrawer = (categoryId?: string, product?: Product) => {
        setProduct(product);
        setCategoryId(categoryId);
        setOpenDrawer(true);
    };

    const closeProductDrawer = () => {
        setOpenDrawer(false);
        setProduct(undefined);
        setCategoryId(undefined);
    };

    return { product, categoryId, isOpenDrawer, openProductDrawer, closeProductDrawer };
};
