import styled from 'styled-components';

export const PreviewZone = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    min-height: 192px;
    border-radius: 24px;
    justify-content: center;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.colors.editor.previewZoneBorder};
    background-color: ${({ theme }) => theme.colors.editor.previewZoneBackground};
`;
