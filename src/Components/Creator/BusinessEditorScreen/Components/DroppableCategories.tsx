import { FunctionComponent, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { Preview } from 'react-dnd-preview';
import styled from 'styled-components';

import placeholderImage from '@/assets/placeholder_image.png';
import { DraggableCategory } from '@/Components/Creator/BusinessEditorScreen/Components/DraggableCategory';
import { CategoryChip } from '@/Components/Customizable/CategoryChip';
import { Category } from '@/Models/Catalog';

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
    onClickAdd: () => void;
    onEdit: (category: Category) => void;
};

const scrollSpeed = 5; // Скорость прокрутки
const scrollThreshold = 50; // Зона чувствительности (в пикселях)

export const DroppableCategories: FunctionComponent<Props> = ({ categories, moveCategory, onClickAdd, onEdit }) => {
    const feedRef = useRef<HTMLDivElement | null>(null);

    const [, dropRef] = useDrop({
        accept: 'category',
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

            if (x - left < scrollThreshold) {
                feedRef.current.scrollLeft -= scrollSpeed;
            } else if (right - x < scrollThreshold) {
                feedRef.current.scrollLeft += scrollSpeed;
            }
        },
    });

    useEffect(() => {
        if (dropRef) dropRef(feedRef);
    }, [dropRef]);

    return (
        <>
            <CategoriesFeed ref={feedRef}>
                <CategoryChip onClick={onClickAdd}>
                    <CategoryChip.Image imageSrc={placeholderImage} />
                    <CategoryChip.Content>Добавить</CategoryChip.Content>
                </CategoryChip>
                {categories.map((category) => (
                    <DraggableCategory key={category.id} category={category} onEdit={onEdit} />
                ))}
            </CategoriesFeed>
            <Preview>
                {({ item: category, style }) => (
                    <CategoryChip key={(category as Category)?.id} style={style}>
                        <CategoryChip.Image imageSrc={(category as Category)?.image?.url ?? ''} />
                        <CategoryChip.Content>{(category as Category)?.name}</CategoryChip.Content>
                    </CategoryChip>
                )}
            </Preview>
        </>
    );
};
