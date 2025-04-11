import { useEffect } from 'react';

export const useTelegramBackButton = (onBack: () => void) => {
    useEffect(() => {
        const backButton = window.Telegram?.WebApp?.BackButton;

        if (backButton) {
            backButton.show();
            backButton.onClick(onBack);
        }

        return () => {
            if (backButton) {
                backButton.hide();
                backButton.offClick(onBack);
            }
        };
    }, [onBack]);
};
