import { FunctionComponent, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { useShallow } from 'zustand/react/shallow';

import placeholderImage from '@/assets/placeholder_image.png';
import { DrawerCatalogCard } from '@/Components/Creator/BusinessEditorScreen/Components/DrawerCatalogCard';
import { DrawerCategoryChip } from '@/Components/Creator/BusinessEditorScreen/Components/DrawerCategoryChip';
import { DrawerThemeSettings } from '@/Components/Creator/BusinessEditorScreen/Components/DrawerThemeSettings';
import { Toolbar } from '@/Components/Creator/BusinessEditorScreen/Components/Toolbar';
import { useControlCategory } from '@/Components/Creator/BusinessEditorScreen/Hooks';
import { useControlProduct } from '@/Components/Creator/BusinessEditorScreen/Hooks/useControlProduct';
import { useControlThemeSettings } from '@/Components/Creator/BusinessEditorScreen/Hooks/useControlThemeSettings';
import { CatalogCard } from '@/Components/Customizable/CatalogCard';
import { CategoryChip } from '@/Components/Customizable/CategoryChip';
import { Title } from '@/Components/Typography';
import { useLongPress } from '@/Hooks/useLongPressElement';
import { Category, Product } from '@/Models/Catalog';
import { ConsumerTheme } from '@/Models/Theme';
import { useBusinessEditorStore } from '@/Store/BusinessEditor';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
`;

const CategoriesFeed = styled.div`
    display: flex;
    overflow-x: auto;
    gap: ${({ theme }) => theme.spacing(1)};
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(1.25)};
`;

export const StepCatalogConstructor: FunctionComponent = () => {
    const {
        catalog: { categories },
        addCategory,
        updateCategory,
        addProductToCategory,
        updateProduct,
        updateTheme,
        setStep,
    } = useBusinessEditorStore(
        useShallow(
            ({ catalog, addCategory, updateCategory, addProductToCategory, updateProduct, updateTheme, setStep }) => ({
                catalog,
                addCategory,
                updateCategory,
                addProductToCategory,
                updateProduct,
                updateTheme,
                setStep,
            }),
        ),
    );

    const {
        isOpenDrawer: isOpenCategoryDrawer,
        category,
        openCategoryDrawer,
        closeCategoryDrawer,
    } = useControlCategory();

    const {
        isOpenDrawer: isOpenProductDrawer,
        product,
        categoryId: productCategoryId,
        openProductDrawer,
        closeProductDrawer,
    } = useControlProduct();

    const {
        isOpenDrawer: isOpenThemeSettingsDrawer,
        openThemeSettingsDrawer,
        closeThemeSettingsDrawer,
    } = useControlThemeSettings();

    // const [isDragCategoriesAllowed, setDragCategoriesAllowed] = useState(false);
    // const { getHandlersForLongPress: getHandlersCategoryLongPress } = useLongPress({
    //     callback: () => setDragCategoriesAllowed(true),
    //     duration: 300,
    // });

    const handleClickAddCategory = () => {
        openCategoryDrawer();
    };

    const getHandleClickAddProduct = (categoryId: string) => {
        return () => {
            openProductDrawer(categoryId);
        };
    };

    const getHandleClickEditCategory = (category: Category) => {
        return () => {
            openCategoryDrawer(category);
        };
    };

    const getHandleClickEditProduct = (product: Product, categoryId: string) => {
        return () => {
            openProductDrawer(categoryId, product);
        };
    };

    const handleSaveCategory = (nextCategory: Category) => {
        if (!category) {
            addCategory(nextCategory);

            return;
        }

        updateCategory(nextCategory);
    };

    const handleSaveProduct = (nextProduct: Product) => {
        if (!product && productCategoryId) {
            addProductToCategory({ categoryId: productCategoryId, product: nextProduct });

            return;
        }

        updateProduct(nextProduct);
    };

    const handleSaveTheme = (theme: ConsumerTheme) => {
        updateTheme(theme);
    };

    const handleDragEndCategory = (result: DropResult) => {
        console.log(result);
    };

    return (
        <>
            <DrawerCategoryChip
                open={isOpenCategoryDrawer}
                onClose={closeCategoryDrawer}
                onSave={handleSaveCategory}
                category={category}
            />
            <DrawerCatalogCard
                open={isOpenProductDrawer}
                onClose={closeProductDrawer}
                onSave={handleSaveProduct}
                product={product}
            />
            <DrawerThemeSettings
                open={isOpenThemeSettingsDrawer}
                onClose={closeThemeSettingsDrawer}
                onSave={handleSaveTheme}
            />
            <Container>
                <Toolbar position="right" onSelectTheme={openThemeSettingsDrawer} />
                <Section>
                    <Title size="h4" weight="bold">
                        Категории
                    </Title>
                    <DragDropContext onDragEnd={handleDragEndCategory}>
                        <Droppable droppableId="categories" direction="horizontal">
                            {(provided) => (
                                <CategoriesFeed ref={provided.innerRef} {...provided.droppableProps}>
                                    <CategoryChip onClick={handleClickAddCategory}>
                                        <CategoryChip.Image imageSrc={placeholderImage} />
                                        <CategoryChip.Content>Добавить</CategoryChip.Content>
                                    </CategoryChip>
                                    {categories?.map((category, index) => (
                                        <Draggable
                                            key={category.id}
                                            draggableId={category.id}
                                            index={index}
                                            // isDragDisabled={!isDragCategoriesAllowed}
                                        >
                                            {(provided, snapshot) => (
                                                <CategoryChip
                                                    key={category?.id}
                                                    onClick={getHandleClickEditCategory(category)}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    // isDragging={snapshot.isDragging}
                                                >
                                                    <CategoryChip.Image imageSrc={category?.image?.url ?? ''} />
                                                    <CategoryChip.Content>{category?.name}</CategoryChip.Content>
                                                </CategoryChip>
                                            )}
                                        </Draggable>
                                    ))}
                                </CategoriesFeed>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Section>
                {categories?.map((category) => (
                    <Section key={category.id}>
                        <Title size="h5" weight="bold" style={{ color: '#ba1924' }}>
                            {category.name}
                        </Title>
                        <ProductsGrid>
                            <CatalogCard onClick={getHandleClickAddProduct(category.id)}>
                                <CatalogCard.Image imageSrc={placeholderImage} />
                                <CatalogCard.Content>
                                    <CatalogCard.Content.Title>Добавить</CatalogCard.Content.Title>
                                </CatalogCard.Content>
                            </CatalogCard>
                            {category.products?.map((product) => (
                                <CatalogCard key={product.id} onClick={getHandleClickEditProduct(product, category.id)}>
                                    <CatalogCard.Image imageSrc={product?.image?.url ?? ''} />
                                    <CatalogCard.Content>
                                        <CatalogCard.Content.Title>{product?.name}</CatalogCard.Content.Title>
                                        <CatalogCard.Content.Description>
                                            {product?.description}
                                        </CatalogCard.Content.Description>
                                        <CatalogCard.Content.Price
                                            currency={product?.price?.currency}
                                            amount={product?.price?.amount}
                                        />
                                    </CatalogCard.Content>
                                </CatalogCard>
                            ))}
                        </ProductsGrid>
                    </Section>
                ))}
            </Container>
        </>
    );
};
