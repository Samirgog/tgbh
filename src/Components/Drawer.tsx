import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import React, { FunctionComponent, HTMLAttributes } from 'react';
import styled from 'styled-components';

const DrawerOverlay = styled(motion.div)`
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
`;
const DrawerContent = styled(motion.div)`
    background: white;
    width: 100%;
    height: 100vh;
    padding: 20px;
    position: relative;
    box-shadow: -5px 0px 5px 1px #aaaaaa;
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
            <DrawerOverlay>
                <DrawerContent
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ duration: 0.2 }}
                >
                    <CloseButton onClick={onClose}>
                        <X size={20} />
                    </CloseButton>
                    {children}
                </DrawerContent>
            </DrawerOverlay>
        )}
    </AnimatePresence>
);
