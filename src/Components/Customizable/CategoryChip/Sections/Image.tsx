import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

import { useURLResourceLoadControl } from '@/Hooks/useURLResourceLoadControl';

const Container = styled.div`
    display: flex;
    width: 40px;
    height: 40px;

    > * {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-position: center;
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
