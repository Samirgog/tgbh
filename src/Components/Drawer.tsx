import React, { FunctionComponent, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

const DrawerOverlay = styled(motion.div)`
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: flex-end;
`;
const DrawerContent = styled(motion.div)`
    background: white;
    width: 80%;
    height: 100vh;
    padding: 20px;
    position: relative;
`;
const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: transparent;
    cursor: pointer;
`;

type Props = {
    open: boolean;
    onClose: () => void;
} & HTMLAttributes<HTMLDivElement>;

export const Drawer: FunctionComponent<Props> = ({ open, onClose, children }) => (
    <AnimatePresence>
        {open && (
            <DrawerOverlay onClick={onClose}>
                <DrawerContent initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}>
                    <CloseButton onClick={onClose}>
                        <X size={20} />
                    </CloseButton>
                    {children}
                </DrawerContent>
            </DrawerOverlay>
        )}
    </AnimatePresence>
);
