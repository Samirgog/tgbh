import React, { useLayoutEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { ThemeProvider } from 'styled-components';

import { useAuth } from '@/api/hooks/useAuth';
import { Creator } from '@/Components/Creator';
import { GlobalStyles } from '@/Styles/global';
import { theme as defaultTheme } from '@/Styles/theme';

function App() {
    const { isPending: isLoadingAuth, isAuthenticated } = useAuth();
    const [theme, setTheme] = useState(defaultTheme);

    useLayoutEffect(() => {
        const tg = window.Telegram?.WebApp;

        if (tg) {
            tg.ready();
            tg.expand();
            tg.isVerticalSwipesEnabled = false;
            const themeParams = tg.themeParams;

            setTheme({
                ...defaultTheme,
                colors: {
                    ...defaultTheme.colors,
                    background: themeParams.bg_color ?? defaultTheme.colors.background,
                    backgroundSecondary: themeParams.secondary_bg_color ?? defaultTheme.colors.backgroundSecondary,
                    textPrimary: themeParams.text_color ?? defaultTheme.colors.textPrimary,
                    textSecondary: themeParams.subtitle_text_color ?? defaultTheme.colors.textSecondary,
                    button: {
                        primary: themeParams.button_color ?? defaultTheme.colors.button.primary,
                    },
                    link: {
                        primary: themeParams.link_color ?? defaultTheme.colors.link.primary,
                    },
                    input: {
                        background: themeParams.secondary_bg_color ?? defaultTheme.colors.input.background,
                    },
                },
                mode: tg.colorScheme,
            });
        }
    }, []);

    if (isLoadingAuth || !isAuthenticated) {
        return null;
    }

    return (
        <ThemeProvider theme={theme}>
            <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
                <GlobalStyles theme={theme} />
                <Creator />
                {/*<Consumer />*/}
            </DndProvider>
        </ThemeProvider>
    );
}

export default App;
