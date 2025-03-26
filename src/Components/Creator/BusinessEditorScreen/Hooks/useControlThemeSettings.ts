import { useState } from 'react';

export const useControlThemeSettings = () => {
    const [isOpenDrawer, setOpenDrawer] = useState(false);

    const openThemeSettingsDrawer = () => {
        setOpenDrawer(true);
    };

    const closeThemeSettingsDrawer = () => {
        setOpenDrawer(false);
    };

    return { isOpenDrawer, openThemeSettingsDrawer, closeThemeSettingsDrawer };
};
