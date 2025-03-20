import React, { FunctionComponent, HTMLAttributes } from 'react';
import { useURLResourceLoadControl } from '@/Hooks/useURLResourceLoadControl';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    width: 40px;
    height: 40px;

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: contain;
        object-position: center;
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
