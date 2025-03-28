import React from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { ThemeProvider } from 'styled-components';

import { Creator } from '@/Components/Creator';
import { GlobalStyles } from '@/Styles/global';
import { theme } from '@/Styles/theme';

function App() {
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
