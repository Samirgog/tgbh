import { HTMLAttributes, useEffect, useState } from 'react';

type Params<T extends HTMLVideoElement | HTMLImageElement> = {
    src?: string;
} & HTMLAttributes<T>;

export function useURLResourceLoadControl<T extends HTMLVideoElement | HTMLImageElement>({ src, ...attrs }: Params<T>) {
    const [currentSrc, setCurrentSrc] = useState(src);
    const [isLoadError, setLoadError] = useState(false);

    useEffect(() => {
        setCurrentSrc(src);

        return () => {
            setLoadError(false);
        };
    }, [src]);

    const getHandlersForElement = () => {
        const { onError, ...restAttrs } = attrs;

        const handleError: typeof onError = (event) => {
            onError?.(event);

            if (event.currentTarget instanceof HTMLVideoElement && !event.currentTarget.error) {
                return;
            }

            setLoadError(true);
        };

        return {
            onError: handleError,
            ...restAttrs,
        };
    };

    return { currentSrc, isLoadError, getHandlersForElement };
}
