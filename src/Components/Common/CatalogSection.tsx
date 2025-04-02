import styled from 'styled-components';

export const CatalogSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
`;
