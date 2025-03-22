import { useState } from 'react';

import { Category } from '@/Models/Catalog';

export const useControlCategory = () => {
    const [isOpenDrawer, setOpenDrawer] = useState(false);
    const [category, setCategory] = useState<Category>();

    const openCategoryDrawer = (category?: Category) => {
        if (category) {
            setCategory(category);
        }

        setOpenDrawer(true);
    };

    const closeCategoryDrawer = () => {
        setOpenDrawer(false);
        setCategory(undefined);
    };

    return { category, isOpenDrawer, openCategoryDrawer, closeCategoryDrawer };
};
