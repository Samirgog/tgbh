import { Title } from '@/Components/Typography';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
`;

const CategoriesFeed = styled.div`
    display: flex;
    overflow-x: auto;
    gap: ${({ theme }) => theme.spacing(1)};
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(1.25)};
`;

export const StepCatalogConstructor: FunctionComponent = () => {
    return (
        <Container>
            <Section>
                <Title size="h4" weight="bold">
                    Категории
                </Title>
                <CategoriesFeed></CategoriesFeed>
            </Section>
        </Container>
    );
};
