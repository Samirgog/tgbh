import { FunctionComponent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import placeholderImage from '@/assets/placeholder_image.png';
import { Text, Title } from '@/Components/@ui-kit';
import { CatalogSection } from '@/Components/Common/CatalogSection';
import { CategoriesFeed } from '@/Components/Common/CategoriesFeed';
import { ProductsGrid } from '@/Components/Common/ProductsGrid';
import { CatalogCard } from '@/Components/Customizable/CatalogCard';
import { CategoryChip } from '@/Components/Customizable/CategoryChip';
import { ConsumerThemeProvider } from '@/ConsumerThemeProvider';
import { Business } from '@/Models/Business';
import { Product } from '@/Models/Catalog';

const StoreCatalogWrapper = styled.div`
    position: relative;
    overflow-y: auto;
    height: 100vh;
    background: ${({ theme }) => theme.colors.background};
`;

const Banner = styled.div<{ imageUrl: string }>`
    width: 100%;
    height: 250px;
    background: url(${({ imageUrl }) => imageUrl}) center/cover no-repeat;
    position: relative;
    display: flex;
    align-items: flex-end;
    padding: 16px;
    box-sizing: border-box;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 65%;
        background: linear-gradient(transparent, rgba(0, 0, 0, 7), rgba(0, 0, 0, 1));
    }
`;

const StoreInfo = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    color: white;
    z-index: 1;
    bottom: 50px;
    gap: ${({ theme }) => theme.spacing(0.5)};
`;

const CatalogWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 2;
    background: white;
    margin-top: -50px;
    transition: transform 0.3s ease-in-out;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    padding: 16px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 -4px 16px;
    gap: ${({ theme }) => theme.spacing(2)};
`;

const CategoriesHeader = styled.div<{ $isSticky: boolean }>`
    position: ${({ $isSticky }) => ($isSticky ? 'fixed' : 'relative')};
    top: ${({ $isSticky }) => ($isSticky ? '0' : 'auto')};
    padding: ${({ $isSticky }) => ($isSticky ? '16px' : '0')};
    left: 0;
    width: 100%;
    background: white;
    z-index: 3;
`;

const HeaderBlock = styled.div`
    display: flex;
    padding: 8px;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.8);
    width: fit-content;
`;

type Props = {
    business: Business;
    onClickProduct?: (product: Product) => void;
};

export const StoreCatalog: FunctionComponent<Props> = ({ business, onClickProduct }) => {
    const { name, banner, description, store } = business ?? {};
    const {
        catalog: { categories },
        theme,
    } = store ?? {};

    const [isSticky, setIsSticky] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

    const containerRef = useRef<HTMLDivElement>(null);
    const categoriesHeaderRef = useRef<HTMLDivElement>(null);
    const categoriesFeedRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const scrollPos = containerRef.current.scrollTop;
                setIsSticky(scrollPos > 100);
            }
        };

        const el = containerRef.current;
        if (el) el.addEventListener('scroll', handleScroll);
        return () => el?.removeEventListener('scroll', handleScroll);
    }, []);

    const getHandleClickCategory = (id: string) => {
        return () => {
            if (id === selectedCategory) {
                setSelectedCategory(undefined);

                return;
            }

            setSelectedCategory(id);

            const element = document.getElementById(id);
            const headerHeight = categoriesHeaderRef.current?.offsetHeight || 0;

            if (element && containerRef.current) {
                const targetPosition = element.offsetTop - headerHeight;

                containerRef.current.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }

            if (categoriesFeedRef.current) {
                const categoryElement = categoriesFeedRef.current.querySelector(
                    `[data-category-id="${id}"]`,
                ) as HTMLDivElement;

                if (categoryElement) {
                    const feedWidth = categoriesFeedRef.current.offsetWidth;
                    const categoryLeft = categoryElement.offsetLeft;
                    const categoryWidth = categoryElement.offsetWidth;
                    const newScrollLeft = categoryLeft - feedWidth / 2 + categoryWidth / 2;

                    categoriesFeedRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
                }
            }
        };
    };

    const getHandleClickProduct = (product: Product) => {
        return () => {
            onClickProduct?.(product);
        };
    };

    return (
        <ConsumerThemeProvider theme={theme}>
            <StoreCatalogWrapper ref={containerRef}>
                <Banner imageUrl={banner?.url ?? '/src/assets/banner-pizza.jpg'}>
                    <StoreInfo>
                        <HeaderBlock>
                            <Title size="h3" color="white">
                                {name}
                            </Title>
                        </HeaderBlock>
                        <HeaderBlock>
                            <Text size="b1" color="white">
                                {description}
                            </Text>
                        </HeaderBlock>
                    </StoreInfo>
                </Banner>
                <CatalogWrapper>
                    <CategoriesHeader ref={categoriesHeaderRef} $isSticky={isSticky}>
                        <CatalogSection>
                            <Title size="h5" weight="bold" color="accent">
                                Категории
                            </Title>
                            <CategoriesFeed ref={categoriesFeedRef} style={{ padding: '0 16px', margin: '0 -16px' }}>
                                {categories?.map(({ id, name, image }) => (
                                    <CategoryChip
                                        key={id}
                                        data-category-id={id}
                                        selected={id === selectedCategory}
                                        onClick={getHandleClickCategory(id)}
                                    >
                                        <CategoryChip.Image imageSrc={image?.url ?? ''} />
                                        <CategoryChip.Content>{name}</CategoryChip.Content>
                                    </CategoryChip>
                                ))}
                            </CategoriesFeed>
                        </CatalogSection>
                    </CategoriesHeader>
                    {categories?.map(({ id, name, products }) => (
                        <CatalogSection key={id} id={id}>
                            <Title size="h5" weight="bold" color="accent">
                                {name}
                            </Title>
                            <ProductsGrid>
                                {products?.map((product) => (
                                    <CatalogCard key={id} onClick={getHandleClickProduct(product)}>
                                        <CatalogCard.Image imageSrc={product.image?.url ?? placeholderImage} />
                                        <CatalogCard.Content>
                                            <CatalogCard.Content.Title>{product.name}</CatalogCard.Content.Title>
                                            <CatalogCard.Content.Description>
                                                {product.description}
                                            </CatalogCard.Content.Description>
                                            <CatalogCard.Content.Price
                                                currency={product.price?.currency}
                                                amount={product.price?.amount}
                                            />
                                        </CatalogCard.Content>
                                    </CatalogCard>
                                ))}
                            </ProductsGrid>
                        </CatalogSection>
                    ))}
                </CatalogWrapper>
            </StoreCatalogWrapper>
        </ConsumerThemeProvider>
    );
};
