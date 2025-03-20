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

const Chip = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing(0.5)};
    padding: 4px 16px 4px 4px;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 9999px;
`;

type ChipProps = HTMLAttributes<HTMLDivElement>;

type CategoryChipComponent = {
    Image: typeof Image;
    Content: typeof Content;
} & ForwardRefExoticComponent<PropsWithoutRef<PropsWithChildren<ChipProps>> & RefAttributes<HTMLDivElement>>;

const CategoryChip: CategoryChipComponent = Object.assign(
    forwardRef<HTMLDivElement, ChipProps>(({ children }, ref) => {
        return <Chip>{children}</Chip>;
    }),
    { Image, Content },
);
