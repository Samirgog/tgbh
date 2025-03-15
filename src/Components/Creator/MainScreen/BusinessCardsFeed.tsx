import { FunctionComponent } from 'react';
import styled from 'styled-components';

import { Text, Title } from '@/Components/Typography';

const AddIcon = () => (
    <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M29 0.25C13.1156 0.25 0.25 13.1156 0.25 29C0.25 44.8844 13.1156 57.75 29 57.75C44.8844 57.75 57.75 44.8844 57.75 29C57.75 13.1156 44.8844 0.25 29 0.25ZM43.375 31.875H31.875V43.375H26.125V31.875H14.625V26.125H26.125V14.625H31.875V26.125H43.375V31.875Z"
            fill="black"
        />
    </svg>
);

const FeedContainer = styled.div`
    display: flex;
    overflow-x: auto;
    gap: ${({ theme }) => theme.spacing(1)};
    padding: 10px;
    margin: -10px;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const CardContainer = styled.div`
    min-width: 250px;
    height: 308px;
    background: white;
    border-radius: 24px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    cursor: pointer;
`;

const AddCard = styled(CardContainer)`
    min-width: 138px;
    justify-content: center;
    align-items: center;
`;

const AddCardContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(1)};
`;

const ImageContainer = styled.div`
    width: 100%;
    height: 218px;
    background: #f0f0f0; /* Заглушка под изображение */
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    
    img {
        width: 100%;
        height: 218px;
        border-top-left-radius: 24px;
        border-top-right-radius: 24px;
    }
`;

const Content = styled.div`
    padding: 16px 20px 0 20px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(0.5)};
`;

type BusinessCardProps = {
    imageUrl: string;
    title?: string;
    subtitle?: string;
    description?: string;
};

const BusinessCard: FunctionComponent<BusinessCardProps> = ({ imageUrl, title, subtitle, description }) => {
    return (
        <CardContainer>
            <ImageContainer>
                <img alt="" src={imageUrl} />
            </ImageContainer>
            <Content>
                <Title size="h6" weight="semibold">
                    {title}
                </Title>
                <Text size="b2" color="secondary">
                    {subtitle}
                </Text>
                <Text size="b2" color="secondary">
                    {description}
                </Text>
            </Content>
        </CardContainer>
    );
};

type BusinessCardsFeedProps = {
    businesses: { id: string; name: string; banner: string; organizationName: string; description?: string }[];
};

export const BusinessCardsFeed: FunctionComponent<BusinessCardsFeedProps> = ({ businesses }) => {
    return (
        <FeedContainer>
            <AddCard>
                <AddCardContent>
                    <AddIcon />
                    <Title size="h6" weight="semibold">
                        Добавить
                    </Title>
                </AddCardContent>
            </AddCard>
            {businesses.map(({ id, banner, name, organizationName, description }) => (
                <BusinessCard
                    key={id}
                    imageUrl={banner}
                    title={name}
                    subtitle={organizationName}
                    description={description}
                />
            ))}
        </FeedContainer>
    );
};
