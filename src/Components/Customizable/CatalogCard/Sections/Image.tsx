import React, { FunctionComponent, HTMLAttributes } from 'react';
import { useURLResourceLoadControl } from '@/Hooks/useURLResourceLoadControl';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 192px;

    img {
        width: 100%;
        aspect-ratio: 1 / 1;
        object-fit: contain;
        object-position: center;
        border-radius: 24px 24px 0 0;
    }
`;

type Props = {
    imageSrc: string;
} & HTMLAttributes<HTMLImageElement>;

export const Image: FunctionComponent<Props> = ({ imageSrc, onError, ...attrs }) => {
    const { currentSrc, isLoadError, getHandlersForElement } = useURLResourceLoadControl<HTMLImageElement>({
        src: imageSrc,
        onError,
    });

    if (isLoadError) {
        return null;
    }

    return (
        <Container>
            <img alt="" src={currentSrc} {...attrs} {...getHandlersForElement()} />
        </Container>
    );
};
