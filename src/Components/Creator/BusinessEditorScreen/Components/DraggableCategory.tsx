import { FunctionComponent, TouchEvent, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { v4 as uuid } from 'uuid';
import { useShallow } from 'zustand/react/shallow';

import { ContextMenu } from '@/Components/Creator/BusinessEditorScreen/Components/ContextMenu';
import { CategoryChip } from '@/Components/Customizable/CategoryChip';
import { Category } from '@/Models/Catalog';
import { useBusinessEditorStore } from '@/Store/BusinessEditor';

type Props = {
    category: Category;
    onEdit: (category: Category) => void;
};

export const DraggableCategory: FunctionComponent<Props> = ({ category, onEdit }) => {
    const { removeCategory, addCategory } = useBusinessEditorStore(
        useShallow(({ removeCategory, addCategory }) => ({ removeCategory, addCategory })),
    );

    const [isContextMenuOpen, setContextMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState<{ top: number; left: number; align: 'left' | 'right' }>({
        top: 0,
        left: 0,
        align: 'right',
    });
    const [scale, setScale] = useState(1);

    const holdTimer = useRef<NodeJS.Timeout | undefined>();
    const scaleInterval = useRef<NodeJS.Timeout | undefined>();

    const [{ isDragging }, dragRef] = useDrag({
        type: 'category',
        item: category,
        collect: (monitor) => {
            if (monitor.isDragging()) {
                setContextMenuOpen(false);
            }

            return { isDragging: monitor.isDragging() };
        },
    });

    const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
        if (isDragging) return;

        const touch = event.touches[0];
        const viewportWidth = window.innerWidth;

        const align = touch.clientX > viewportWidth / 2 ? 'left' : 'right';
        setMenuPosition({ top: touch.clientY, left: touch.clientX, align });

        holdTimer.current = setTimeout(() => {
            setContextMenuOpen(true);
        }, 1000);

        let scaleValue = 1;

        scaleInterval.current = setInterval(() => {
            if (scaleValue < 1.2) {
                scaleValue += 0.02;
                setScale(scaleValue);
            } else {
                clearInterval(scaleInterval.current);
            }
        }, 50);
    };

    const handleTouchEnd = () => {
        if (holdTimer.current) {
            clearTimeout(holdTimer.current);
        }

        if (scaleInterval.current) {
            clearInterval(scaleInterval.current);
        }

        setScale(1);
    };

    const handleEdit = () => {
        onEdit(category);
        setContextMenuOpen(false);
    };

    const handleRemove = () => {
        removeCategory(category.id);
        setContextMenuOpen(false);
    };

    const handleDuplicate = () => {
        addCategory({ ...category, id: uuid() });
        setContextMenuOpen(false);
    };

    return (
        <>
            <div
                ref={dragRef}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                style={{
                    display: isDragging ? 'none' : 'flex',
                    transform: `scale(${scale})`,
                    transition: 'transform 0.2s ease',
                    position: 'relative',
                }}
            >
                <CategoryChip key={category?.id}>
                    <CategoryChip.Image imageSrc={category?.image?.url ?? ''} />
                    <CategoryChip.Content style={{ whiteSpace: 'nowrap' }}>{category?.name}</CategoryChip.Content>
                </CategoryChip>
            </div>
            {isContextMenuOpen && (
                <ContextMenu
                    top={menuPosition.top}
                    left={menuPosition.left}
                    align={menuPosition.align}
                    onClose={() => {
                        setContextMenuOpen(false);
                        setScale(1);
                    }}
                    onEdit={handleEdit}
                    onDuplicate={handleDuplicate}
                    onDelete={handleRemove}
                />
            )}
        </>
    );
};
