import styled from 'styled-components';

export const PreviewZone = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    min-height: 192px;
    height: auto;
    flex: 1 0 auto;
    border-radius: 24px;
    justify-content: center;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.colors.editor.previewZoneBorder};
    background-image: url('https://www.transparenttextures.com/patterns/food.png');
    background-size: cover;
    padding: 24px;
    overflow: hidden; /* Обрезаем все, что выходит за границы */

    /* Псевдоэлемент для размытия */
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.2); /* Полупрозрачный фон */
        backdrop-filter: blur(2px); /* Сильное размытие */
        -webkit-backdrop-filter: blur(2px);
        z-index: 0; /* Помещаем под контент */
    }

    /* Чтобы контент оставался поверх блюра */
    > * {
        position: relative;
        z-index: 1;
    }
`;
