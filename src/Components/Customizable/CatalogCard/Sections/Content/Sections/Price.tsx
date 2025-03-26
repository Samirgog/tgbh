import { FunctionComponent, HTMLAttributes } from 'react';
import styled from 'styled-components';

import { Title } from '@/Components/Typography';
import { useConsumerTheme } from '@/ConsumerThemeProvider';

const Container = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing(0.5)};
    align-items: center;
    margin-top: auto;
`;

type Props = {
    currency?: string;
    amount?: number;
} & HTMLAttributes<HTMLDivElement>;

export const Price: FunctionComponent<Props> = ({ currency, amount, ...attrs }) => {
    const { theme } = useConsumerTheme();

    return (
        <Container {...attrs}>
            <Title size="h4" weight="bold">
                {amount}
            </Title>
            <Title size="h4" weight="bold" style={{ color: theme.colors.accent }}>
                {currency}
            </Title>
        </Container>
    );
};
