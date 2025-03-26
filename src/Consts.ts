import { ConsumerThemeSetting } from '@/Models/Theme';
import { consumerTheme } from '@/Styles/theme';

export const RUBLE_SYMBOL = '₽';

export const CONSUMER_THEMES: ConsumerThemeSetting[] = [
    { key: 'Default', name: 'Стандарт', theme: consumerTheme.default },
    { key: 'Green', name: 'Зеленая', theme: consumerTheme.green },
    { key: 'Blue', name: 'Синяя', theme: consumerTheme.blue },
];
