import styled from 'styled-components';

export const CategoriesFeed = styled.div`
    display: flex;
    overflow-x: auto;
    gap: ${({ theme }) => theme.spacing(1)};
    scrollbar-width: none;
    padding: 6px;
    margin: -6px;

    &::-webkit-scrollbar {
        display: none;
    }
`;
