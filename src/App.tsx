import React from 'react';
import { ThemeProvider } from 'styled-components';

import { Creator } from '@/Components/Creator';
import { GlobalStyles } from '@/Styles/global';
import { theme } from '@/Styles/theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Creator />
        </ThemeProvider>
    );
}

export default App;
