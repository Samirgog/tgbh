import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useShallow } from 'zustand/react/shallow';

import placeholderImage from '@/assets/placeholder_image.png';
import { DroppableCategories } from '@/Components/Creator/BusinessEditorScreen/Components/DroppableCategories';
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

import { DrawerCatalogCard, DrawerCategoryChip, DrawerThemeSettings } from '../Drawers';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
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
        updateCatalog,
        addCategory,
        updateCategory,
        addProductToCategory,
        updateProduct,
        updateTheme,
        setStep,
    } = useBusinessEditorStore(
        useShallow(
            ({
                catalog,
                updateCatalog,
                addCategory,
                updateCategory,
                addProductToCategory,
                updateProduct,
                updateTheme,
                setStep,
            }) => ({
                catalog,
                updateCatalog,
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

    const handleMoveCategories = (dragIndex: number, hoverIndex: number) => {
        const updatedCategories = [...categories];
        const [movedItem] = updatedCategories.splice(dragIndex, 1);
        updatedCategories.splice(hoverIndex, 0, movedItem);

        const reorderedCategories = updatedCategories.map((category, index) => ({
            ...category,
            priority: index + 1,
        }));

        updateCatalog({ categories: reorderedCategories });
    };

    const handleClickAddCategory = () => {
        openCategoryDrawer();
    };

    const getHandleClickAddProduct = (categoryId: string) => {
        return () => {
            openProductDrawer(categoryId);
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
                    <DroppableCategories
                        categories={categories}
                        moveCategory={handleMoveCategories}
                        onClickAdd={handleClickAddCategory}
                        onEdit={openCategoryDrawer}
                    />
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
