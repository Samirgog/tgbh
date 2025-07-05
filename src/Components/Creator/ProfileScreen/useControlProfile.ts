import { useState } from 'react';

export const useControlProfile = () => {
    const [isOpenDrawer, setOpenDrawer] = useState(false);

    const openProfileDrawer = () => {
        setOpenDrawer(true);
    };

    const closeProfileDrawer = () => {
        setOpenDrawer(false);
    };

    return { isOpenDrawer, openProfileDrawer, closeProfileDrawer };
};
