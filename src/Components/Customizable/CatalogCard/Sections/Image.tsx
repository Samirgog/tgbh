import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

import { useURLResourceLoadControl } from '@/Hooks/useURLResourceLoadControl';

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
    imageSrc?: string;
    stub?: ReactNode;
} & HTMLAttributes<HTMLImageElement>;

export const Image: FunctionComponent<Props> = ({ imageSrc, stub, onError, ...attrs }) => {
    const { currentSrc, isLoadError, getHandlersForElement } = useURLResourceLoadControl<HTMLImageElement>({
        src: imageSrc,
        onError,
    });

    if (isLoadError && !stub) {
        return null;
    }

    return (
        <Container>{stub ? stub : <img alt="" src={currentSrc} {...attrs} {...getHandlersForElement()} />}</Container>
    );
};
