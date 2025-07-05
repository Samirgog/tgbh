import React, {
    forwardRef,
    ForwardRefExoticComponent,
    HTMLAttributes,
    PropsWithChildren,
    PropsWithoutRef,
    RefAttributes,
} from 'react';
import styled from 'styled-components';

import { useConsumerTheme } from '@/ConsumerThemeProvider';
import { ConsumerTheme } from '@/Models/Theme';

import { Content, Image } from './Sections';

const Card = styled.div<{ $theme?: ConsumerTheme }>`
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    text-align: center;
    box-sizing: border-box;
    color: inherit;
    transition-duration: 0.1s;
    transition-property: transform, box-shadow;
    min-width: 148px;
    flex: 1 1 auto;
    background: ${({ $theme }) => $theme?.colors?.cardBackground ?? '#fcf0f4'};
    border: 1px solid ${({ $theme }) => $theme?.colors?.cardBorder ?? '#d8c2c0'};
    transition: transform 0.05s;
`;

type CardProps = HTMLAttributes<HTMLDivElement>;

type CatalogCardComponent = {
    Image: typeof Image;
    Content: typeof Content;
} & ForwardRefExoticComponent<PropsWithoutRef<PropsWithChildren<CardProps>> & RefAttributes<HTMLDivElement>>;

const ForwardedCatalogCard = forwardRef<HTMLDivElement, CardProps>(({ children, ...attrs }, ref) => {
    const { theme } = useConsumerTheme();

    return (
        <Card $theme={theme} ref={ref} {...attrs}>
            {children}
        </Card>
    );
});

ForwardedCatalogCard.displayName = 'CatalogCard';

export const CatalogCard: CatalogCardComponent = Object.assign(ForwardedCatalogCard, { Image, Content });
