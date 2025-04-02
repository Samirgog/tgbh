import { Copy, Edit, Trash } from 'lucide-react';
import { FunctionComponent } from 'react';
import styled from 'styled-components';

import { Text } from '@/Components/@ui-kit/Typography';

const MenuWrapper = styled.div<{ top: number; left: number; align: 'left' | 'right' }>`
    position: fixed;
    top: ${({ top }) => top}px;
    ${({ align, left }) => (align === 'right' ? `left: ${left}px;` : `right: ${window.innerWidth - left}px;`)}
    background: white;
    border-radius: 16px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    padding: 8px;
    z-index: 1000;
    opacity: 0;
    animation: fadeIn 0.2s ease-in forwards;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;

const MenuItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    cursor: pointer;
    transition: background 0.2s;
    border: none;

    &:not(:last-child) {
        border-bottom: 1px solid #ddd;
    }
`;

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;
`;

type Props = {
    top: number;
    left: number;
    align: 'left' | 'right';
    onClose: () => void;
    onEdit: () => void;
    onDuplicate: () => void;
    onDelete: () => void;
};

export const ContextMenu: FunctionComponent<Props> = ({ top, left, align, onClose, onEdit, onDuplicate, onDelete }) => {
    return (
        <>
            <Backdrop onClick={onClose} />
            <MenuWrapper top={top} left={left} align={align}>
                <MenuItem onClick={onEdit}>
                    <Edit size={18} />
                    <Text size="b1" weight="medium">
                        Редактировать
                    </Text>
                </MenuItem>
                <MenuItem onClick={onDuplicate}>
                    <Copy size={18} />
                    <Text size="b1" weight="medium">
                        Дублировать
                    </Text>
                </MenuItem>
                <MenuItem onClick={onDelete}>
                    <Trash size={18} color="red" />
                    <Text size="b1" weight="medium">
                        Удалить
                    </Text>
                </MenuItem>
            </MenuWrapper>
        </>
    );
};
