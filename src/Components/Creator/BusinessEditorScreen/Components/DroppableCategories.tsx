import { FunctionComponent, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';

import { DraggableCategory } from '@/Components/Creator/BusinessEditorScreen/Components/DraggableCategory';
import { DndType } from '@/Enums';
import { Category } from '@/Models/Catalog';

const SCROLL_SPEED = 5;
const SCROLL_THRESHOLD = 50;

const CategoriesFeed = styled.div`
    display: flex;
    overflow-x: auto;
    gap: ${({ theme }) => theme.spacing(1)};
    scrollbar-width: none;
    padding: 6px;
    margin: -6px;

    &::-webkit-scrollbar {
        display: none;
    }
`;

type Props = {
    categories: Category[];
    moveCategory: (fromIndex: number, toIndex: number) => void;
    onEdit: (category: Category) => void;
};

export const DroppableCategories: FunctionComponent<Props> = ({ categories, moveCategory, onEdit }) => {
    const feedRef = useRef<HTMLDivElement | null>(null);

    const [, dropRef] = useDrop({
        accept: DndType.CATEGORY,
        hover: (item: Category, monitor) => {
            if (!feedRef.current) return;

            const dragIndex = categories.findIndex((c) => c.id === item.id);
            const hoverIndex = Math.floor(
                (monitor.getClientOffset()?.x ?? 0 - feedRef.current.getBoundingClientRect().left) /
                    (feedRef.current.scrollWidth / categories.length),
            );

            if (dragIndex !== hoverIndex && dragIndex !== -1 && hoverIndex >= 0 && hoverIndex < categories.length) {
                moveCategory(dragIndex, hoverIndex);
            }

            const { x } = monitor.getClientOffset() || { x: 0 };
            const { left, right } = feedRef.current.getBoundingClientRect();

            if (x - left < SCROLL_THRESHOLD) {
                feedRef.current.scrollLeft -= SCROLL_SPEED;
            } else if (right - x < SCROLL_THRESHOLD) {
                feedRef.current.scrollLeft += SCROLL_SPEED;
            }
        },
    });

    useEffect(() => {
        if (dropRef) dropRef(feedRef);
    }, [dropRef]);

    return (
        <CategoriesFeed ref={feedRef}>
            {categories.map((category) => (
                <DraggableCategory key={category.id} category={category} onEdit={onEdit} />
            ))}
        </CategoriesFeed>
    );
};
