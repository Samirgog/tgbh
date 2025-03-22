export const theme = {
    colors: {
        primary: '#007aff',
        secondary: '#FBBF24',
        error: '#e53935',
        background: '#F3F4F6',
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
        editor: {
            previewZoneBackground: '#F8FAFC',
            previewZoneBorder: '#dddddd',
            categoryChip: {
                backgroundColor: '#ba1924',
            },
        },
    },
    spacing: (factor: number) => `${factor * 8}px`,
};
