import { FunctionComponent } from 'react';
import { Text, TypographyProps } from '@/Components/Typography';

export const Description: FunctionComponent<TypographyProps> = ({ children, ...attrs }) => {
    return (
        <Text size="b2" {...attrs}>
            {children}
        </Text>
    );
};
