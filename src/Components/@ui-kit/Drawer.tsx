// import { AnimatePresence, motion } from 'framer-motion';
// import { X } from 'lucide-react';
// import React, { FunctionComponent, HTMLAttributes } from 'react';
// import styled from 'styled-components';
//
// const DrawerOverlay = styled(motion.div)`
//     position: fixed;
//     top: 0;
//     right: 0;
//     width: 100%;
//     height: 100%;
//     display: flex;
//     justify-content: flex-end;
//     z-index: 1500;
// `;
// const DrawerContent = styled(motion.div)`
//     background: white;
//     width: 100%;
//     height: 100vh;
//     padding: 20px;
//     position: relative;
//     box-shadow: -5px 0px 5px 1px #aaaaaa;
// `;
// const CloseButton = styled.button`
//     position: absolute;
//     top: 10px;
//     right: 10px;
//     border: none;
//     background: transparent;
//     cursor: pointer;
//     z-index: 1501;
// `;
//
// type Props = {
//     open: boolean;
//     onClose: () => void;
// } & HTMLAttributes<HTMLDivElement>;
//
// export const Drawer: FunctionComponent<Props> = ({ open, onClose, children }) => (
//     <AnimatePresence>
//         {open && (
//             <DrawerOverlay>
//                 <DrawerContent
//                     initial={{ x: '100%' }}
//                     animate={{ x: 0 }}
//                     exit={{ x: '100%' }}
//                     transition={{ duration: 0.2 }}
//                 >
//                     <CloseButton onClick={onClose}>
//                         <X size={20} />
//                     </CloseButton>
//                     {children}
//                 </DrawerContent>
//             </DrawerOverlay>
//         )}
//     </AnimatePresence>
// );
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
    background: white;
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
    background: #ccc;
    border-radius: 2px;
    margin: 8px auto;
`;

const Content = styled.div`
    padding: 16px;
    overflow-y: auto;
    flex: 1;
`;
