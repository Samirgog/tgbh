import { createContext, ReactNode, useContext, useState } from 'react';

import { ConsumerTheme } from '@/Models/Theme';

import { consumerTheme } from './Styles/theme';

type ConsumerThemeContextProps = {
    theme: ConsumerTheme;
    setTheme?: (theme: ConsumerTheme) => void;
};

const ConsumerThemeContext = createContext<ConsumerThemeContextProps>({
    theme: consumerTheme.default,
});

export const ConsumerThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState(consumerTheme.default);

    return <ConsumerThemeContext.Provider value={{ theme, setTheme }}>{children}</ConsumerThemeContext.Provider>;
};

export const useConsumerTheme = () => useContext(ConsumerThemeContext);
