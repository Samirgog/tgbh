import { FunctionComponent, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';

import { ProductsGrid } from '@/Components/Common/ProductsGrid';
import { DraggableProduct } from '@/Components/Creator/BusinessEditorScreen/Components/DraggableProduct';
import { DndType } from '@/Enums';
import { Product } from '@/Models/Catalog';

type Props = {
    products: Product[];
    categoryId: string;
    moveProduct: (params: { dragIndex: number; hoverIndex: number; categoryId: string }) => void;
    onEdit: (product: Product) => void;
};

export const DroppableProducts: FunctionComponent<Props> = ({ products, categoryId, moveProduct, onEdit }) => {
    const gridRef = useRef<HTMLDivElement | null>(null);

    const [, dropRef] = useDrop({
        accept: DndType.PRODUCT,
        hover: (item: Product, monitor) => {
            if (!gridRef.current) return;

            const dragIndex = products.findIndex((p) => p.id === item.id);
            const hoverIndex = Math.floor(
                (monitor.getClientOffset()?.x ?? 0 - gridRef.current.getBoundingClientRect().left) /
                    (gridRef.current.scrollWidth / products.length),
            );

            if (dragIndex !== hoverIndex && dragIndex !== -1 && hoverIndex >= 0 && hoverIndex < products.length) {
                moveProduct({ dragIndex, hoverIndex, categoryId });
            }
        },
    });

    useEffect(() => {
        if (dropRef) dropRef(gridRef);
    }, [dropRef]);

    return (
        <ProductsGrid ref={gridRef}>
            {products.map((product) => (
                <DraggableProduct key={product.id} product={product} categoryId={categoryId} onEdit={onEdit} />
            ))}
        </ProductsGrid>
    );
};
