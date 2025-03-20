import { FunctionComponent } from 'react';
import { Title as TitleTypography, TypographyProps } from '@/Components/Typography';

export const Title: FunctionComponent<TypographyProps> = ({ children, ...attrs }) => {
    return (
        <TitleTypography size="h5" weight="bold" {...attrs}>
            {children}
        </TitleTypography>
    );
};
