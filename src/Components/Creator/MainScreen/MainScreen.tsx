import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useShallow } from 'zustand/react/shallow';

import { useStores } from '@/api/hooks/useStores';
import { Title } from '@/Components/@ui-kit/Typography';
import { Header } from '@/Components/Creator/MainScreen/Header';
import { RoutesCreator } from '@/Enums';
import { useBusinessEditorStore } from '@/Store/BusinessEditor';

import { BusinessCardsFeed } from './BusinessCardsFeed';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 16px;
    gap: ${({ theme }) => theme.spacing(2)};
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(3)};
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 -4px 16px;
    padding: 16px;
    margin: 0 -16px;
    height: 100%;
`;

export const MainScreen: FunctionComponent = () => {
    const { user } = useBusinessEditorStore(useShallow(({ user }) => ({ user })));
    const { data: { storesByOwner: stores = [] } = {} } = useStores(user?.id);
    const navigate = useNavigate();

    const handleClickProfile = () => {
        navigate(RoutesCreator.PROFILE);
    };

    return (
        <Container>
            <Header name={`${user.firstName} ${user.lastName}`} onClick={handleClickProfile} />
            <Content>
                <Title size="h4" weight="medium">
                    Мои Магазины
                </Title>
                <BusinessCardsFeed stores={stores} />
            </Content>
        </Container>
    );
};
