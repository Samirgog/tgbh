import React, {
    forwardRef,
    ForwardRefExoticComponent,
    HTMLAttributes,
    PropsWithChildren,
    PropsWithoutRef,
    RefAttributes,
    useMemo,
} from 'react';
import styled, { css } from 'styled-components';

import { CategoryChipContext } from './CategoryChip.context';
import { Content, Image } from './Sections';

const Chip = styled.div<{ $selected: boolean }>`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(1)};
    padding: 4px 16px 4px 4px;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 9999px;

    ${({ $selected }) =>
        $selected &&
        css`
            background-color: ${({ theme }) => theme.colors.editor.categoryChip.backgroundColor};
        `}
`;

type ChipProps = {
    selected?: boolean;
} & HTMLAttributes<HTMLDivElement>;

type CategoryChipComponent = {
    Image: typeof Image;
    Content: typeof Content;
} & ForwardRefExoticComponent<PropsWithoutRef<PropsWithChildren<ChipProps>> & RefAttributes<HTMLDivElement>>;

const ForwardedCategoryChip = forwardRef<HTMLDivElement, ChipProps>(({ selected = false, children, ...attrs }, ref) => {
    const context = useMemo(() => ({ selected }), [selected]);

    return (
        <CategoryChipContext.Provider value={context}>
            <Chip $selected={selected} ref={ref} {...attrs}>
                {children}
            </Chip>
        </CategoryChipContext.Provider>
    );
});

ForwardedCategoryChip.displayName = 'CategoryChip';

export const CategoryChip: CategoryChipComponent = Object.assign(ForwardedCategoryChip, { Image, Content });
