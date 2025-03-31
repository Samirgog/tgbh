import React, { FunctionComponent } from 'react';
import { Preview } from 'react-dnd-preview';

import placeholderImage from '@/assets/placeholder_image.png';
import { CatalogCard } from '@/Components/Customizable/CatalogCard';
import { CategoryChip } from '@/Components/Customizable/CategoryChip';
import { DndType } from '@/Enums';
import { Category } from '@/Models/Catalog';
import { DraggableProduct } from '@/Models/Dnd';

export const DndPreview: FunctionComponent = () => {
    return (
        <Preview
            generator={(preview) => {
                const { item, itemType, style } = preview ?? {};

                if (itemType === DndType.CATEGORY)
                    return (
                        <CategoryChip key={(item as Category)?.id} style={style}>
                            <CategoryChip.Image imageSrc={(item as Category)?.image?.url ?? ''} />
                            <CategoryChip.Content>{(item as Category)?.name}</CategoryChip.Content>
                        </CategoryChip>
                    );

                if (itemType === DndType.PRODUCT) {
                    const draggableProduct = item as DraggableProduct;

                    return (
                        <CatalogCard key={draggableProduct.id} style={{ ...style, width: draggableProduct.width }}>
                            <CatalogCard.Image imageSrc={draggableProduct.image?.url ?? placeholderImage} />
                            <CatalogCard.Content>
                                <CatalogCard.Content.Title>{draggableProduct.name}</CatalogCard.Content.Title>
                                <CatalogCard.Content.Description>
                                    {draggableProduct.description}
                                </CatalogCard.Content.Description>
                                <CatalogCard.Content.Price
                                    currency={draggableProduct.price?.currency}
                                    amount={draggableProduct.price?.amount}
                                />
                            </CatalogCard.Content>
                        </CatalogCard>
                    );
                }

                return <></>;
            }}
        />
    );
};
