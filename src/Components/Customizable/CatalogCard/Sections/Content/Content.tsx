import { FunctionComponent, HTMLAttributes } from 'react';
import { Title, Description, Price } from './Sections';
import styled from 'styled-components';

type ContentComponent = {
    Title: typeof Title;
    Description: typeof Description;
    Price: typeof Price;
} & FunctionComponent<HTMLAttributes<HTMLDivElement>>;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(1)};
    padding: 16px;
`;

export const Content: ContentComponent = ({ children }) => {
    return <Container>{children}</Container>;
};

Content.Title = Title;
Content.Description = Description;
Content.Price = Price;
