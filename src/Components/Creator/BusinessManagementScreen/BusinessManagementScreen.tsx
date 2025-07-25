import { BarChart, CheckCircle, CreditCard, Edit, LayoutGrid, MessageSquare, Star, Truck } from 'lucide-react';
import React, { FunctionComponent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useShallow } from 'zustand/react/shallow';

import { useStoreById } from '@/api/hooks/useStoreById';
import { List } from '@/Components/@ui-kit';
import { Button } from '@/Components/@ui-kit/Button';
import { Text, Title } from '@/Components/@ui-kit/Typography';
import { RUBLE_SYMBOL } from '@/Consts';
import { RoutesCreator, StepBusinessEditor } from '@/Enums';
import { useTelegramBackButton } from '@/Hooks/useTelegramBackButton';
import { useBusinessEditorStore } from '@/Store/BusinessEditor';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
    padding: 16px;
`;

const Banner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 128px;
    background: #ddd;
    border-radius: 16px;

    img {
        width: 100%;
        height: 100%;
        border-radius: 16px;
        object-fit: cover;
    }
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(1)};
`;

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const gradientAnimation = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;

const ProItem = styled.div`
    display: flex;
    align-items: center;
    padding: 12px;
    cursor: pointer;
    transition: background 0.2s ease;
    background: linear-gradient(90deg, #ff6b6b, #ffcc33, #ff6b6b);
    background-size: 200% 200%;
    color: white;
    font-weight: 600;
    animation: ${gradientAnimation} 3s infinite linear;
    box-shadow: 0px 4px 12px rgba(255, 107, 107, 0.4);
    border-radius: 0 0 8px 8px;
    border-top: none;
    margin: 8px -16px -16px;

    &:hover {
        filter: brightness(1.1);
    }

    svg {
        margin-right: 12px;
        color: white;
    }
`;

export const BusinessManagementScreen: FunctionComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { data: { storeWithDetails } = {} } = useStoreById(location.state?.storeId);
    const { bannerUrl, bannerName, name, description, paymentMethods } = storeWithDetails ?? {};
    const { setStep, updateBusinessInfo, updateCatalog, updateReceiveInfo, updatePaymentInfo } = useBusinessEditorStore(
        useShallow(({ setStep, updateBusinessInfo, updateCatalog, updateReceiveInfo, updatePaymentInfo }) => ({
            setStep,
            updateBusinessInfo,
            updateCatalog,
            updateReceiveInfo,
            updatePaymentInfo,
        })),
    );

    useTelegramBackButton(() => navigate(-1));

    const handleClickPreview = () => {
        navigate(RoutesCreator.BUSINESS_PREVIEW, {
            state: {
                store: storeWithDetails,
            },
        });
    };

    const handleEditBusinessInfo = () => {
        updateBusinessInfo({ name, description, banner: { url: bannerUrl ?? '', name: bannerName ?? '' } });
        setStep(StepBusinessEditor.BUSINESS_INFO);
        navigate(RoutesCreator.BUSINESS_EDITOR);
    };

    const handleEditCatalog = () => {
        updateCatalog({
            categories: storeWithDetails?.categories?.map(({ id, name, priority, imageName, imageUrl, products }) => ({
                id,
                name,
                priority,
                products: products?.map(({ id, name, description, imageName, imageUrl, priceAmount, parameters }) => ({
                    id,
                    name,
                    description: description ?? undefined,
                    image: { url: imageUrl ?? '', name: imageName ?? '' },
                    price: { amount: priceAmount, currency: RUBLE_SYMBOL },
                    parameters: parameters?.map(({ id, text, priceAmount }) => ({
                        id,
                        text,
                        price: { amount: priceAmount!, currency: RUBLE_SYMBOL },
                    })),
                })),
                image: { url: imageUrl ?? '', name: imageName ?? '' },
            })),
        });
        setStep(StepBusinessEditor.CATALOG_CONSTRUCTOR);
        navigate(RoutesCreator.BUSINESS_EDITOR);
    };

    const handleEditReceive = () => {
        updateReceiveInfo({ ways: storeWithDetails?.deliveryMethods?.map(({ receiveWay }) => receiveWay) });
        setStep(StepBusinessEditor.RECEIVE_INFO);
        navigate(RoutesCreator.BUSINESS_EDITOR);
    };

    const handleEditPayment = () => {
        updatePaymentInfo({
            types: storeWithDetails?.paymentMethods?.map(({ type }) => type),
            conditions: storeWithDetails?.paymentConditions?.map(({ condition }) => condition),
        });
        setStep(StepBusinessEditor.PAYMENT_INFO);
        navigate(RoutesCreator.BUSINESS_EDITOR);
    };

    return (
        <Container>
            <Banner>
                <img alt="" src={bannerUrl ?? ''} />
            </Banner>
            <Header>
                <Title size="h4" weight="medium">
                    {name}
                </Title>
                <Text size="b2" color="secondary">
                    {description}
                </Text>
            </Header>
            <Button variant="outlined" onClick={handleClickPreview}>
                Просмотреть
            </Button>
            <ListContainer>
                <List>
                    <List.Item onClick={handleEditBusinessInfo}>
                        <List.Item.Icon>
                            <Edit size={20} />
                        </List.Item.Icon>
                        <List.Item.Content>Основные настройки</List.Item.Content>
                    </List.Item>
                    <List.Item onClick={handleEditReceive}>
                        <List.Item.Icon>
                            <Truck size={20} />
                        </List.Item.Icon>
                        <List.Item.Content>Способы получения</List.Item.Content>
                    </List.Item>
                    <List.Item onClick={handleEditPayment}>
                        <List.Item.Icon>
                            <CreditCard size={20} />
                        </List.Item.Icon>
                        <List.Item.Content>Способы оплаты</List.Item.Content>
                    </List.Item>
                    <List.Item onClick={handleEditCatalog}>
                        <List.Item.Icon>
                            <LayoutGrid size={20} />
                        </List.Item.Icon>
                        <List.Item.Content>Управление каталогом</List.Item.Content>
                    </List.Item>
                    {/*<List.Item>*/}
                    {/*    <List.Item.Icon>*/}
                    {/*        <BarChart size={20} />*/}
                    {/*    </List.Item.Icon>*/}
                    {/*    <List.Item.Content>Статистика</List.Item.Content>*/}
                    {/*</List.Item>*/}
                    {/*<List.Item>*/}
                    {/*    <List.Item.Icon>*/}
                    {/*        <MessageSquare size={20} />*/}
                    {/*    </List.Item.Icon>*/}
                    {/*    <List.Item.Content>Отзывы и вопросы</List.Item.Content>*/}
                    {/*</List.Item>*/}
                    {/*<List.Item>*/}
                    {/*    <List.Item.Icon>*/}
                    {/*        <CheckCircle size={20} />*/}
                    {/*    </List.Item.Icon>*/}
                    {/*    <List.Item.Content>Статус магазина</List.Item.Content>*/}
                    {/*</List.Item>*/}
                </List>
                {/*<ProItem>*/}
                {/*    <Star size={20} />*/}
                {/*    <Title size="h4" color="white">*/}
                {/*        Premium*/}
                {/*    </Title>*/}
                {/*</ProItem>*/}
            </ListContainer>
        </Container>
    );
};
