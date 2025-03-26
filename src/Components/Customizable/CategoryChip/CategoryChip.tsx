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

import { useConsumerTheme } from '@/ConsumerThemeProvider';
import { ConsumerTheme } from '@/Models/Theme';

import { CategoryChipContext } from './CategoryChip.context';
import { Content, Image } from './Sections';

const Chip = styled.div<{ $selected: boolean; $theme?: ConsumerTheme }>`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(1)};
    padding: 4px 16px 4px 4px;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 9999px;

    ${({ $selected, $theme }) =>
        $selected &&
        css`
            background-color: ${({ theme }) =>
                $theme?.colors.accent ?? theme.colors.editor.categoryChip.backgroundColor};
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
    const { theme } = useConsumerTheme();

    return (
        <CategoryChipContext.Provider value={context}>
            <Chip $selected={selected} $theme={theme} ref={ref} {...attrs}>
                {children}
            </Chip>
        </CategoryChipContext.Provider>
    );
});

ForwardedCategoryChip.displayName = 'CategoryChip';

export const CategoryChip: CategoryChipComponent = Object.assign(ForwardedCategoryChip, { Image, Content });
