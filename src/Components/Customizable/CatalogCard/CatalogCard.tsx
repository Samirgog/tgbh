import {
    forwardRef,
    ForwardRefExoticComponent,
    HTMLAttributes,
    PropsWithChildren,
    PropsWithoutRef,
    RefAttributes,
} from 'react';
import styled from 'styled-components';
import { Image, Content } from './Sections';

const Card = styled.div`
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-shrink: 0;
    box-sizing: border-box;
    color: inherit;
    transition-duration: 0.1s;
    transition-property: transform, box-shadow;
    width: 192px;
    min-width: 0;
    background: #fff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

type CardProps = HTMLAttributes<HTMLDivElement>;

type CatalogCardComponent = {
    Image: typeof Image;
    Content: typeof Content;
} & ForwardRefExoticComponent<PropsWithoutRef<PropsWithChildren<CardProps>> & RefAttributes<HTMLDivElement>>;

const CatalogCard: CatalogCardComponent = Object.assign(
    forwardRef<HTMLDivElement, CardProps>(({ children }, ref) => {
        return <Card>{children}</Card>;
    }),
    { Image, Content },
);
