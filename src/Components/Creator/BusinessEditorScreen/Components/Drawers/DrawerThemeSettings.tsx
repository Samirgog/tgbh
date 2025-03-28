import { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

import pepperoni from '@/assets/pepperoni.png';
import { Button } from '@/Components/Button';
import { PreviewZone } from '@/Components/Creator/BusinessEditorScreen/Components/PreviewZone';
import { CatalogCard } from '@/Components/Customizable/CatalogCard';
import { CategoryChip } from '@/Components/Customizable/CategoryChip';
import { Drawer } from '@/Components/Drawer';
import { Text, Title } from '@/Components/Typography';
import { CONSUMER_THEMES, RUBLE_SYMBOL } from '@/Consts';
import { useConsumerTheme } from '@/ConsumerThemeProvider';
import { ConsumerTheme, ConsumerThemeSetting } from '@/Models/Theme';

const DrawerContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(3)};
`;

const PreviewContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(1)};
`;

const Categories = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(1)};
`;

const ThemePicker = styled.div`
    display: flex;
    gap: 12px;
    overflow-x: auto;
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-self: center;
`;

const ThemeCard = styled.div<{ $selected: boolean; $bgColor: string }>`
    width: ${({ $selected }) => ($selected ? '40%' : '30%')};
    height: 128px;
    border-radius: 16px;
    cursor: pointer;
    border: 2px solid ${({ $selected }) => ($selected ? '#ba1924' : 'transparent')};
    background-color: ${({ $bgColor }) => $bgColor};
    transition: 0.2s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8px;
`;

const ColorBadge = styled.div<{ $color: string }>`
    display: flex;
    width: 100%;
    height: 32px;
    border-radius: 16px;
    background-color: ${({ $color }) => $color};
`;

type Props = {
    open: boolean;
    onClose: () => void;
    onSave?: (theme: ConsumerTheme) => void;
};

export const DrawerThemeSettings: FunctionComponent<Props> = ({ open, onClose, onSave }) => {
    const [selectedTheme, setSelectedTheme] = useState(CONSUMER_THEMES[0]);
    const { theme, setTheme } = useConsumerTheme();

    const getHandleSelectTheme = (themeSetting: ConsumerThemeSetting) => {
        return () => {
            setSelectedTheme(themeSetting);
            setTheme?.(themeSetting.theme);
        };
    };

    const handleSave = () => {
        onSave?.(theme);
        onClose();
    };

    return (
        <Drawer open={open} onClose={onClose}>
            <DrawerContainer>
                <Container>
                    <PreviewZone>
                        <PreviewContent>
                            <Categories>
                                {Array(2)
                                    .fill({ image: pepperoni, name: 'Пицца' })
                                    .map(({ image, name }, index) => (
                                        <CategoryChip key={index} selected={index === 0}>
                                            <CategoryChip.Image imageSrc={image} />
                                            <CategoryChip.Content>{name}</CategoryChip.Content>
                                        </CategoryChip>
                                    ))}
                            </Categories>
                            <Title size="h5" weight="bold" style={{ color: '#ba1924' }}>
                                Пицца
                            </Title>
                            <CatalogCard style={{ width: '192px' }}>
                                <CatalogCard.Image imageSrc={pepperoni} />
                                <CatalogCard.Content>
                                    <CatalogCard.Content.Title>Пепперони</CatalogCard.Content.Title>
                                    <CatalogCard.Content.Description>
                                        Колбаски пепперони, сыр, томатный соус
                                    </CatalogCard.Content.Description>
                                    <CatalogCard.Content.Price currency={RUBLE_SYMBOL} amount={555} />
                                </CatalogCard.Content>
                            </CatalogCard>
                        </PreviewContent>
                    </PreviewZone>
                    <ThemePicker>
                        {CONSUMER_THEMES.map((consumerTheme) => (
                            <ThemeCard
                                key={consumerTheme.key}
                                $bgColor={consumerTheme.theme.colors.cardBackground}
                                $selected={selectedTheme.key === consumerTheme.key}
                                onClick={getHandleSelectTheme(consumerTheme)}
                            >
                                <ColorBadge $color={consumerTheme.theme.colors.accent} />
                                <Text size="b2">{consumerTheme.name}</Text>
                            </ThemeCard>
                        ))}
                    </ThemePicker>
                </Container>
                <ButtonWrapper>
                    <Button onClick={handleSave}>Сохранить</Button>
                </ButtonWrapper>
            </DrawerContainer>
        </Drawer>
    );
};
