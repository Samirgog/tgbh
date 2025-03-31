import { FunctionComponent, TouchEvent, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { v4 as uuid } from 'uuid';
import { useShallow } from 'zustand/react/shallow';

import placeholderImage from '@/assets/placeholder_image.png';
import { ContextMenu } from '@/Components/Creator/BusinessEditorScreen/Components/ContextMenu';
import { CatalogCard } from '@/Components/Customizable/CatalogCard';
import { DndType } from '@/Enums';
import { Product } from '@/Models/Catalog';
import { DraggableProduct as DraggableProductType } from '@/Models/Dnd';
import { useBusinessEditorStore } from '@/Store/BusinessEditor';

type Props = {
    product: Product;
    categoryId: string;
    onEdit: (product: Product) => void;
};

export const DraggableProduct: FunctionComponent<Props> = ({ product, categoryId, onEdit }) => {
    const { removeProductFromCategory, addProductToCategory } = useBusinessEditorStore(
        useShallow(({ removeProductFromCategory, addProductToCategory }) => ({
            removeProductFromCategory,
            addProductToCategory,
        })),
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
    const cardRef = useRef<HTMLDivElement | null>(null);

    const [{ isDragging }, dragRef] = useDrag({
        type: DndType.PRODUCT,
        item: (): DraggableProductType => {
            const width = cardRef.current?.offsetWidth || 168;

            return { ...product, width };
        },
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
        onEdit(product);
        setContextMenuOpen(false);
    };

    const handleRemove = () => {
        removeProductFromCategory({ categoryId, productId: product.id });
        setContextMenuOpen(false);
    };

    const handleDuplicate = () => {
        addProductToCategory({ categoryId, product: { ...product, id: uuid() } });
        setContextMenuOpen(false);
    };

    return (
        <>
            <div
                ref={(node) => {
                    dragRef(node);
                    cardRef.current = node;
                }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                style={{
                    transform: `scale(${scale})`,
                    transition: 'transform 0.2s ease',
                    position: 'relative',
                    ...(isDragging ? { opacity: 0 } : {}),
                }}
            >
                <CatalogCard>
                    <CatalogCard.Image imageSrc={product.image?.url ?? placeholderImage} />
                    <CatalogCard.Content>
                        <CatalogCard.Content.Title>{product.name}</CatalogCard.Content.Title>
                        <CatalogCard.Content.Description>{product.description}</CatalogCard.Content.Description>
                        <CatalogCard.Content.Price currency={product.price?.currency} amount={product.price?.amount} />
                    </CatalogCard.Content>
                </CatalogCard>
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
