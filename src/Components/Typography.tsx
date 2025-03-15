import styled, { css } from 'styled-components';

const titleSizes = {
    h1: '32px',
    h2: '28px',
    h3: '24px',
    h4: '20px',
    h5: '18px',
    h6: '16px',
} as const;

const textSizes = {
    b1: '16px',
    b2: '14px',
    b3: '12px',
} as const;

const fontWeights = {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
} as const;

const colors = {
    general: '#333',
    secondary: '#666',
    accent: '#007BFF',
} as const;

interface TypographyProps {
    size?: keyof typeof titleSizes | keyof typeof textSizes;
    color?: keyof typeof colors;
    weight?: keyof typeof fontWeights;
    underline?: boolean;
    strikethrough?: boolean;
}

const typographyStyles = css<TypographyProps>`
    font-size: ${({ size }) =>
        size ? titleSizes[size as keyof typeof titleSizes] || textSizes[size as keyof typeof textSizes] : '16px'};
    font-weight: ${({ weight }) => (weight ? fontWeights[weight] : 400)};
    color: ${({ color }) => (color ? colors[color] : colors.general)};
    text-decoration: ${({ underline, strikethrough }) =>
        underline && strikethrough
            ? 'underline line-through'
            : underline
              ? 'underline'
              : strikethrough
                ? 'line-through'
                : 'none'};
`;

export const Title = styled.h1<TypographyProps>`
    ${typographyStyles}
`;

export const Text = styled.p<TypographyProps>`
    ${typographyStyles}
`;
