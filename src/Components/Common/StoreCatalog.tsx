import { ShoppingCart } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { mockBusiness } from '@/__mock__/business';
import placeholderImage from '@/assets/placeholder_image.png';
import { Text, Title } from '@/Components/@ui-kit';
import { CatalogSection } from '@/Components/Common/CatalogSection';
import { CategoriesFeed } from '@/Components/Common/CategoriesFeed';
import { ProductsGrid } from '@/Components/Common/ProductsGrid';
import { CatalogCard } from '@/Components/Customizable/CatalogCard';
import { CategoryChip } from '@/Components/Customizable/CategoryChip';
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
        height: 40%;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
    }
`;

const StoreInfo = styled.div`
    position: relative;
    color: white;
    z-index: 1;
`;

const CatalogWrapper = styled.div`
    position: relative;
    z-index: 2;
    background: white;
    border-radius: 16px 16px 0 0;
    padding: 16px;
    margin-top: -10vh;
    transition: transform 0.3s ease-in-out;
`;

const CategoriesHeader = styled.div<{ $isSticky: boolean }>`
    position: ${({ $isSticky }) => ($isSticky ? 'fixed' : 'relative')};
    top: ${({ $isSticky }) => ($isSticky ? '0' : 'auto')};
    left: 0;
    width: 100%;
    background: white;
    padding: 12px 16px;
    z-index: 3;
    box-shadow: ${({ $isSticky }) => ($isSticky ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none')};
    transition: box-shadow 0.2s ease-in-out;
`;

export const StoreCatalog = () => {
    const { store: { catalog: { categories = [] } = {} } = {} } = mockBusiness ?? {};
    const [scrollY, setScrollY] = useState(0);
    const [isSticky, setIsSticky] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const [cart, setCart] = useState<Product[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const scrollPos = containerRef.current.scrollTop;
                setScrollY(scrollPos);
                setIsSticky(scrollPos > 100);
            }
        };

        const el = containerRef.current;
        if (el) el.addEventListener('scroll', handleScroll);
        return () => el?.removeEventListener('scroll', handleScroll);
    }, []);

    const getHandleAddToCart = (product: Product) => {
        return () => {
            if (product.parameters?.length) {
                setSelectedProduct(product);
            } else {
                setCart((prev) => [...prev, product]);
            }
        };
    };

    return (
        <>
            {/*<Drawer open={} onClose={} />*/}
            <StoreCatalogWrapper ref={containerRef}>
                <Banner imageUrl="/src/assets/banner-test.png">
                    <StoreInfo>
                        <Title size="h3">{mockBusiness.name}</Title>
                        <Text size="b1">{mockBusiness.description}</Text>
                        <p>⭐ 4.8</p>
                    </StoreInfo>
                </Banner>
                <CatalogWrapper>
                    <CategoriesHeader $isSticky={isSticky}>
                        <Title size="h3">Категории</Title>
                        <CategoriesFeed>
                            {categories?.map(({ id, name, image }) => (
                                <CategoryChip key={id}>
                                    <CategoryChip.Image imageSrc={image?.url ?? ''} />
                                    <CategoryChip.Content>{name}</CategoryChip.Content>
                                </CategoryChip>
                            ))}
                        </CategoriesFeed>
                    </CategoriesHeader>
                    {categories?.map(({ id, name, products }) => (
                        <CatalogSection key={id}>
                            <Title size="h5" weight="bold" style={{ color: '#ba1924' }}>
                                {name}
                            </Title>
                            <ProductsGrid>
                                {products?.map((product) => (
                                    <CatalogCard key={id} onClick={getHandleAddToCart(product)}>
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
                {cart.length > 0 && <ShoppingCart color="#ba1924" />}
            </StoreCatalogWrapper>
        </>
    );
};
