import { FunctionComponent, HTMLAttributes } from 'react';
import { Title } from '@/Components/Typography';
import styled from 'styled-components';

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
    return (
        <Container {...attrs}>
            <Title size="h4" weight="bold" style={{ color: '#f54748' }}>
                {currency}
            </Title>
            <Title size="h4" weight="bold">
                {amount}
            </Title>
        </Container>
    );
};
