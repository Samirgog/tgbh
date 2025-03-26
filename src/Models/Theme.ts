export type ConsumerThemeColors = {
    background: string;
    accent: string;
    cardBackground: string;
    cardBorder: string;
};

export type ConsumerTheme = {
    colors: ConsumerThemeColors;
};

export type ConsumerThemeSetting = {
    key: string;
    name: string;
    theme: ConsumerTheme;
};
