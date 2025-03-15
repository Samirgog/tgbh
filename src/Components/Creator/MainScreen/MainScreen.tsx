import { FunctionComponent } from 'react';
import styled from 'styled-components';

import banner from '@/assets/banner-test.png';
import logo from '@/assets/logo.png';
import { Title } from '@/Components/Typography';

import { BusinessCardsFeed } from './BusinessCardsFeed';

const mockBusinesses = [
    {
        id: '1',
        banner,
        name: 'Шаурма Дяди Федора',
        organizationName: 'ИП Иванов',
        description: 'Вкусовые сосочки довольны',
    },
];

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 16px;
    gap: ${({ theme }) => theme.spacing(1)};
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(1)};
`;

export const MainScreen: FunctionComponent = () => {
    return (
        <Container>
            <img alt="" src={logo} />
            <Content>
                <Title size="h4" weight="medium">
                    Мой Бизнес
                </Title>
                <BusinessCardsFeed businesses={mockBusinesses} />
            </Content>
        </Container>
    );
};
