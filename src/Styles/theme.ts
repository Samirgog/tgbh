export const theme = {
    colors: {
        primary: '#007aff',
        secondary: '#FBBF24',
        error: '#e53935',
        background: '#F3F4F6',
        backgroundSecondary: '#fff',
        text: '#1F2937',
        textPrimary: '#000',
        textSecondary: '#6B7280',
        placeholder: '#9CA3AF',
        border: '#e2e2e2',
        input: {
            background: '#fff',
        },
        button: {
            primary: '#007aff',
        },
        link: {
            primary: '#007aff',
        },
        editor: {
            previewZoneBackground: '#F8FAFC',
            previewZoneBorder: '#dddddd',
            categoryChip: {
                backgroundColor: '#ba1924',
            },
            placeholderImage: '/assets/placeholder_image.png',
        },
    },
    spacing: (factor: number) => `${factor * 8}px`,
};

export const consumerTheme = {
    default: {
        colors: {
            background: '#fff',
            accent: '#ba1924',
            cardBackground: '#fcf0f4',
            cardBorder: '#d8c2c0',
        },
    },
    blue: {
        colors: {
            background: '#fff',
            accent: '#aab99a',
            cardBackground: '#D0DDD0',
            cardBorder: '#F0F0D7',
        },
    },
    green: {
        colors: {
            background: '#fff',
            accent: '#3674b5',
            cardBackground: '#a1e3f9',
            cardBorder: '#d1f8ef',
        },
    },
};
