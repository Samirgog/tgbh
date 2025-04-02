import { FunctionComponent } from 'react';

import { Text, TypographyProps } from '@/Components/@ui-kit/Typography';

import { useCategoryChipContext } from '../CategoryChip.hooks';

export const Content: FunctionComponent<TypographyProps> = ({ children, ...attrs }) => {
    const { selected } = useCategoryChipContext();

    return (
        <Text size="b1" weight="medium" style={selected ? { color: '#fff' } : undefined} {...attrs}>
            {children}
        </Text>
    );
};
