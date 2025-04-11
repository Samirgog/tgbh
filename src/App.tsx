import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { ThemeProvider } from 'styled-components';

import { Creator } from '@/Components/Creator';
import { GlobalStyles } from '@/Styles/global';
import { theme } from '@/Styles/theme';

function App() {
    useEffect(() => {
        const tg = window.Telegram?.WebApp;

        if (tg) {
            tg.ready();
            tg.expand();
            tg.isVerticalSwipesEnabled = false;
            const themeParams = tg.themeParams;

            console.log('🌈 Тема пользователя:', themeParams);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
                <GlobalStyles />
                <Creator />
            </DndProvider>
        </ThemeProvider>
    );
}

export default App;
