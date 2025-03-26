import { useCallback, useEffect, useRef, useState } from 'react';

export const useLongPress = ({ callback, duration = 300 }: { callback: () => void; duration?: number }) => {
    const [startLongPress, setStartLongPress] = useState(false);
    const timerRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (startLongPress) {
            timerRef.current = setTimeout(callback, duration);
        }

        if (!startLongPress) {
            clearTimeout(timerRef.current);
        }

        return () => {
            clearTimeout(timerRef.current);
        };
    }, [callback, duration, startLongPress]);

    const start = useCallback(() => {
        setStartLongPress(true);
    }, []);

    const stop = useCallback(() => {
        setStartLongPress(false);
    }, []);

    const getHandlersForLongPress = () => {
        return {
            onTouchStart: start,
            onTouchEnd: stop,
        };
    };

    return { getHandlersForLongPress };
};
