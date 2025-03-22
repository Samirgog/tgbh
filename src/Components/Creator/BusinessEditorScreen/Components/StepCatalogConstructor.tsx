import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useShallow } from 'zustand/react/shallow';

import { DrawerCategoryChip } from '@/Components/Creator/BusinessEditorScreen/Components/DrawerCategoryChip';
import { useControlCategory } from '@/Components/Creator/BusinessEditorScreen/Hooks';
import { CatalogCard } from '@/Components/Customizable/CatalogCard';
import { CategoryChip } from '@/Components/Customizable/CategoryChip';
import { Title } from '@/Components/Typography';
import { Category } from '@/Models/Catalog';
import { useBusinessEditorStore } from '@/Store/BusinessEditor';

import { CategoryImageStub } from './CategoryImageStub';

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
        setStep,
    } = useBusinessEditorStore(
        useShallow(({ catalog, addCategory, updateCategory, setStep }) => ({
            catalog,
            addCategory,
            updateCategory,
            setStep,
        })),
    );

    const {
        isOpenDrawer: isOpenCategoryDrawer,
        category,
        openCategoryDrawer,
        closeCategoryDrawer,
    } = useControlCategory();

    const handleClickAddCategory = () => {
        openCategoryDrawer();
    };

    const getHandleClickEditCategory = (category: Category) => {
        return () => {
            openCategoryDrawer(category);
        };
    };

    const handleSaveCategory = (nextCategory: Category) => {
        if (!category) {
            addCategory(nextCategory);

            return;
        }

        updateCategory(nextCategory);
    };

    return (
        <>
            <DrawerCategoryChip
                open={isOpenCategoryDrawer}
                onClose={closeCategoryDrawer}
                onSave={handleSaveCategory}
                category={category}
            />
            <Container>
                <Section>
                    <Title size="h4" weight="bold">
                        Категории
                    </Title>
                    <CategoriesFeed>
                        {categories?.map((category) => (
                            <CategoryChip key={category?.id} onClick={getHandleClickEditCategory(category)}>
                                <CategoryChip.Image imageSrc={category?.imageUrl} />
                                <CategoryChip.Content>{category?.name}</CategoryChip.Content>
                            </CategoryChip>
                        ))}
                        <CategoryChip onClick={handleClickAddCategory}>
                            <CategoryChip.Image stub={<CategoryImageStub />} />
                            <CategoryChip.Content>Добавить</CategoryChip.Content>
                        </CategoryChip>
                    </CategoriesFeed>
                </Section>
                {categories?.map((category) => (
                    <Section key={category.id}>
                        <Title size="h5" weight="bold" style={{ color: '#ba1924' }}>
                            {category?.name}
                        </Title>
                        <ProductsGrid>
                            {category.products?.map((product) => (
                                <CatalogCard key={product.id}>
                                    <CatalogCard.Image imageSrc={product?.imageUrl} />
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
                            <CatalogCard>
                                <CatalogCard.Image stub={<CategoryImageStub />} />
                                <CatalogCard.Content>
                                    <CatalogCard.Content.Title>Добавить</CatalogCard.Content.Title>
                                </CatalogCard.Content>
                            </CatalogCard>
                        </ProductsGrid>
                    </Section>
                ))}
            </Container>
        </>
    );
};
