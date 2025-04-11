import { FunctionComponent, HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

import { useConsumerTheme } from '@/ConsumerThemeProvider';
import { ConsumerTheme } from '@/Models/Theme';

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
    general: '#000',
    secondary: 'rgba(128, 128, 128, 0.55)',
    accent: '#ba1924',
    white: '#fff',
} as const;

export type TypographyProps = {
    size?: keyof typeof titleSizes | keyof typeof textSizes;
    color?: keyof typeof colors;
    weight?: keyof typeof fontWeights;
    underline?: boolean;
    strikethrough?: boolean;
} & HTMLAttributes<HTMLParagraphElement>;

type TypographyStyles = {
    $consumerTheme?: ConsumerTheme;
} & TypographyProps;

const typographyStyles = css<TypographyStyles>`
    font-size: ${({ size }) =>
        size ? titleSizes[size as keyof typeof titleSizes] || textSizes[size as keyof typeof textSizes] : '16px'};
    font-weight: ${({ weight }) => (weight ? fontWeights[weight] : 400)};
    color: ${({ color, $consumerTheme }) => {
        if ($consumerTheme && color) {
            return $consumerTheme.colors[color];
        }

        return color ? colors[color] : colors.general;
    }};
    letter-spacing: -0.03em;
    text-decoration: ${({ underline, strikethrough }) =>
        underline && strikethrough
            ? 'underline line-through'
            : underline
              ? 'underline'
              : strikethrough
                ? 'line-through'
                : 'none'};
`;

const TitleStyled = styled.h1<TypographyStyles>`
    ${typographyStyles}
`;

const TextStyled = styled.p<TypographyStyles>`
    ${typographyStyles}
`;

export const Title: FunctionComponent<TypographyProps> = ({ children, style, ...attrs }) => {
    const { theme } = useConsumerTheme();

    return (
        <TitleStyled {...attrs} style={style} $consumerTheme={theme}>
            {children}
        </TitleStyled>
    );
};

export const Text: FunctionComponent<TypographyProps> = ({ children, style, ...attrs }) => {
    const { theme } = useConsumerTheme();

    return (
        <TextStyled {...attrs} style={style} $consumerTheme={theme}>
            {children}
        </TextStyled>
    );
};
