import { Plus } from 'lucide-react';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '@/Components/Button';
import { DndPreview } from '@/Components/Creator/BusinessEditorScreen/Components/DndPreview';
import { DroppableCategories } from '@/Components/Creator/BusinessEditorScreen/Components/DroppableCategories';
import { DroppableProducts } from '@/Components/Creator/BusinessEditorScreen/Components/DroppableProducts';
import { Toolbar } from '@/Components/Creator/BusinessEditorScreen/Components/Toolbar';
import { useControlCategory } from '@/Components/Creator/BusinessEditorScreen/Hooks';
import { useControlProduct } from '@/Components/Creator/BusinessEditorScreen/Hooks/useControlProduct';
import { useControlThemeSettings } from '@/Components/Creator/BusinessEditorScreen/Hooks/useControlThemeSettings';
import { Title } from '@/Components/Typography';
import { RoutesCreator, StepBusinessEditor } from '@/Enums';
import { Category, Product } from '@/Models/Catalog';
import { ConsumerTheme } from '@/Models/Theme';
import { useBusinessEditorStore } from '@/Store/BusinessEditor';

import { DrawerCatalogCard, DrawerCategoryChip, DrawerThemeSettings } from '../Drawers';

const Header = styled.div`
    display: flex;
    width: 100%;
    height: 48px;
    padding-bottom: 8px;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: ${({ theme }) => theme.spacing(2)};
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    border-top: 1px solid #ddd;
    margin: 0 -16px;
    padding: 16px 16px 0 16px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 -4px 16px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: ${({ theme }) => theme.spacing(2)};
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
`;

const SectionHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

const AddButton = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ba1924;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
    }

    &:active {
        transform: scale(0.95);
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    }
`;

export const StepCatalogConstructor: FunctionComponent = () => {
    const navigate = useNavigate();

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

    const handleMoveProduct = ({
        dragIndex,
        hoverIndex,
        categoryId,
    }: {
        dragIndex: number;
        hoverIndex: number;
        categoryId: string;
    }) => {
        const products = categories.find((category) => category.id === categoryId)?.products;
        const updatedProducts = [...(products ?? [])];
        const [movedItem] = updatedProducts.splice(dragIndex, 1);

        updatedProducts.splice(hoverIndex, 0, movedItem);

        const reorderedProducts = updatedProducts.map((product, index) => ({
            ...product,
            priority: index + 1,
        }));

        updateCategory({ id: categoryId, products: reorderedProducts });
    };

    const handleClickAddCategory = () => {
        openCategoryDrawer();
    };

    const getHandleClickAddProduct = (categoryId: string) => {
        return () => {
            openProductDrawer(categoryId);
        };
    };

    const getHandleClickEditProduct = (categoryId: string) => {
        return (product: Product) => {
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

    const handlePublish = () => {
        setStep(StepBusinessEditor.PERSONAL_INFO);
        navigate(RoutesCreator.MAIN);
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
                <Header>
                    <Button onClick={handlePublish}>Опубликовать</Button>
                    <Toolbar position="right" onSelectTheme={openThemeSettingsDrawer} />
                </Header>
                <Body>
                    <Section>
                        <SectionHeader>
                            <Title size="h3" weight="semibold">
                                Категории
                            </Title>
                            <AddButton onClick={handleClickAddCategory}>
                                <Plus color="white" size={24} />
                            </AddButton>
                        </SectionHeader>
                        <DroppableCategories
                            categories={categories}
                            moveCategory={handleMoveCategories}
                            onEdit={openCategoryDrawer}
                        />
                    </Section>
                    {categories?.map((category) => (
                        <Section key={category.id}>
                            <SectionHeader>
                                <Title size="h5" weight="bold" style={{ color: '#ba1924' }}>
                                    {category.name}
                                </Title>
                                <AddButton onClick={getHandleClickAddProduct(category.id)}>
                                    <Plus color="white" size={24} />
                                </AddButton>
                            </SectionHeader>
                            <DroppableProducts
                                products={category.products ?? []}
                                categoryId={category.id}
                                moveProduct={handleMoveProduct}
                                onEdit={getHandleClickEditProduct(category.id)}
                            />
                        </Section>
                    ))}
                </Body>
            </Container>
            <DndPreview />
        </>
    );
};
