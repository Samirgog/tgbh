import { FunctionComponent } from 'react';
import { Text, TypographyProps } from '@/Components/Typography';

export const Content: FunctionComponent<TypographyProps> = ({ children, ...attrs }) => {
    return (
        <Text size="b1" weight="medium" {...attrs}>
            {children}
        </Text>
    );
};
