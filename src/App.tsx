import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { ThemeProvider } from 'styled-components';
import { useShallow } from 'zustand/react/shallow';

import { useAuth } from '@/api/hooks/useAuth';
import { Consumer } from '@/Components/Consumer';
import { Creator } from '@/Components/Creator';
import { useBusinessEditorStore } from '@/Store/BusinessEditor';
import { GlobalStyles } from '@/Styles/global';
import { theme } from '@/Styles/theme';

function App() {
    const { isPending: isLoadingAuth, isAuthenticated } = useAuth();

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

    if (isLoadingAuth || !isAuthenticated) {
        return null;
    }

    return (
        <ThemeProvider theme={theme}>
            <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
                <GlobalStyles />
                <Creator />
                {/*<Consumer />*/}
            </DndProvider>
        </ThemeProvider>
    );
}

export default App;
