import { FunctionComponent } from 'react';

import { Title, TypographyProps } from '@/Components/@ui-kit';

export const Content: FunctionComponent<TypographyProps> = ({ children, ...attrs }) => {
    return (
        <Title size="h5" {...attrs}>
            {children}
        </Title>
    );
};
