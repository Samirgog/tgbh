import Lottie from 'lottie-react';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useShallow } from 'zustand/react/shallow';

import { useStores } from '@/api/hooks/useStores';
import onlineShoppingAnimation from '@/assets/online_shopping.json';
import { Button } from '@/Components/@ui-kit';
import { Text, Title } from '@/Components/@ui-kit/Typography';
import { Header } from '@/Components/Creator/MainScreen/Header';
import { RoutesCreator, StepBusinessEditor } from '@/Enums';
// import { RoutesCreator } from '@/Enums';
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
    padding: 16px;
    margin: -16px -16px;
`;

const EmptyContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
    align-items: center;
`;

export const MainScreen: FunctionComponent = () => {
    const { user, setMode, setStep, resetStore } = useBusinessEditorStore(
        useShallow(({ user, setMode, setStep, resetStore }) => ({ user, setMode, setStep, resetStore })),
    );
    const { data: { storesByOwner: stores = [] } = {} } = useStores(user?.id);

    const navigate = useNavigate();
    const handleClickAddCard = () => {
        resetStore();
        setMode('add');
        setStep(StepBusinessEditor.BUSINESS_INFO);
        navigate(RoutesCreator.BUSINESS_EDITOR);
    };

    return (
        <Container>
            <Header name={`${user.firstName} ${user.lastName}`} />
            <Content>
                {stores?.length > 0 ? (
                    <>
                        <Button onClick={handleClickAddCard} style={{ marginBottom: '8px', width: '100%' }}>
                            Создать
                        </Button>
                        <Title size="h4" weight="medium">
                            Мои Магазины
                        </Title>
                        <BusinessCardsFeed stores={stores} />
                    </>
                ) : (
                    <EmptyContainer>
                        <div>
                            <Lottie animationData={onlineShoppingAnimation} loop={true} />
                        </div>
                        <Title size="h4" weight="medium">
                            У вас пока нет магазинов
                        </Title>
                        <Button onClick={handleClickAddCard} style={{ marginBottom: '8px', width: '100%' }}>
                            Создать
                        </Button>
                    </EmptyContainer>
                )}
            </Content>
        </Container>
    );
};
