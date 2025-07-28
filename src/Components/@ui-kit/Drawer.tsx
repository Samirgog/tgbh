import { AnimatePresence, motion } from 'framer-motion';
import { FunctionComponent, ReactNode, useEffect } from 'react';
import styled from 'styled-components';

type Props = {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
};

export const Drawer: FunctionComponent<Props> = ({ open, onClose, children }) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    <Overlay
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <Sheet
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ duration: 0.25 }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        onDragEnd={(e, info) => {
                            if (info.offset.y > 100) {
                                onClose();
                            }
                        }}
                    >
                        <SwipeHandle />
                        <Content>{children}</Content>
                    </Sheet>
                </>
            )}
        </AnimatePresence>
    );
};

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    z-index: 999;
`;

const Sheet = styled(motion.div)`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 95vh;
    background: var(--tg-theme-bg-color, #fff);
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    display: flex;
    flex-direction: column;
`;

const SwipeHandle = styled.div`
    width: 40px;
    height: 4px;
    background: var(--tg-theme-secondary-bg-color, #ccc);
    border-radius: 2px;
    margin: 8px auto;
`;

const Content = styled.div`
    padding: 16px;
    overflow-y: auto;
    flex: 1;
`;
