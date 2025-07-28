import { FunctionComponent, HTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '@/Components/@ui-kit';
import { Text, Title } from '@/Components/@ui-kit/Typography';
import { RoutesCreator, StepBusinessEditor } from '@/Enums';
import { useURLResourceLoadControl } from '@/Hooks/useURLResourceLoadControl';
import { Store } from '@/Models/User';
import { useBusinessEditorStore } from '@/Store/BusinessEditor';

const FeedContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(1)};
    padding: 16px;
    margin: -16px;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const CardContainer = styled.div`
    min-width: 250px;
    background: var(--tg-theme-bg-color, #fff);
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    cursor: pointer;
    ${({ theme }) => {
        if (theme.mode === 'dark') {
            return css`
                border: 1px solid var(--tg-theme-hint-color, #fff);
            `;
        }

        return css`
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
        `;
    }}
    padding: 12px;
`;

const ImageContainer = styled.div`
    width: 100%;
    height: 148px;

    img {
        width: 100%;
        height: 148px;
        border-radius: 24px;
    }
`;

const Content = styled.div`
    padding: 16px 20px 0 20px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(0.5)};
`;

type BusinessCardProps = {
    imageUrl?: string;
    title?: string;
    subtitle?: string;
    description?: string;
} & HTMLAttributes<HTMLDivElement>;

const BusinessCard: FunctionComponent<BusinessCardProps> = ({ imageUrl, title, description, ...attrs }) => {
    const { currentSrc, isLoadError, getHandlersForElement } = useURLResourceLoadControl({ src: imageUrl });

    return (
        <CardContainer {...attrs}>
            {!isLoadError && (
                <ImageContainer>
                    <img alt="" src={currentSrc} {...getHandlersForElement()} />
                </ImageContainer>
            )}
            <Content>
                <Title size="h6" weight="semibold">
                    {title}
                </Title>
                <Text size="b2" color="secondary">
                    {description}
                </Text>
            </Content>
        </CardContainer>
    );
};

type BusinessCardsFeedProps = {
    stores?: Store[];
};

export const BusinessCardsFeed: FunctionComponent<BusinessCardsFeedProps> = ({ stores }) => {
    const { setMode, setEditingStoreId } = useBusinessEditorStore(
        useShallow(({ setMode, setStep, setEditingStoreId, resetStore }) => ({
            setMode,
            setStep,
            setEditingStoreId,
            resetStore,
        })),
    );
    const navigate = useNavigate();

    const getHandleClickCardManage = (storeId: string) => {
        return () => {
            setEditingStoreId(storeId);
            setMode('edit');
            navigate(RoutesCreator.BUSINESS_MANAGEMENT, { state: { storeId } });
        };
    };

    return (
        <FeedContainer>
            {stores?.map(({ id, bannerUrl, name, description }) => (
                <BusinessCard
                    key={id}
                    imageUrl={bannerUrl}
                    title={name}
                    description={description}
                    onClick={getHandleClickCardManage(id)}
                />
            ))}
        </FeedContainer>
    );
};
