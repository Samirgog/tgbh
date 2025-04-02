import pepperoni from '@/assets/pepperoni.png';
import { Catalog } from '@/Models/Catalog';

export const mockCatalog: Catalog = {
    categories: [
        {
            id: '1',
            name: 'Напитки',
            priority: 1,
            image: { url: pepperoni, name: 'drinks' },
            products: [
                {
                    id: '101',
                    name: 'Кола',
                    description: 'Газированный напиток, освежает в жару.',
                    image: { url: pepperoni, name: 'cola' },
                    price: { amount: 99, currency: 'RUB' },
                },
                {
                    id: '102',
                    name: 'Апельсиновый сок',
                    description: 'Свежевыжатый сок из спелых апельсинов.',
                    image: { url: pepperoni, name: 'orange_juice' },
                    price: { amount: 149, currency: 'RUB' },
                },
                {
                    id: '103',
                    name: 'Молочный коктейль',
                    description: 'Клубничный молочный коктейль с мороженым.',
                    image: { url: pepperoni, name: 'milkshake' },
                    price: { amount: 179, currency: 'RUB' },
                    parameters: [
                        { text: 'Маленький (300мл)', price: { amount: 179, currency: 'RUB' } },
                        { text: 'Средний (500мл)', price: { amount: 219, currency: 'RUB' } },
                        { text: 'Большой (700мл)', price: { amount: 259, currency: 'RUB' } },
                    ],
                },
            ],
        },
        {
            id: '2',
            name: 'Фастфуд',
            priority: 2,
            image: { url: pepperoni, name: 'fastfood' },
            products: [
                {
                    id: '201',
                    name: 'Бургер классический',
                    description: 'Сочное мясо, свежие овощи и фирменный соус.',
                    image: { url: pepperoni, name: 'burger' },
                    price: { amount: 249, currency: 'RUB' },
                },
                {
                    id: '202',
                    name: 'Картошка фри',
                    description: 'Хрустящая картошка с солью и специями.',
                    image: { url: pepperoni, name: 'fries' },
                    price: { amount: 129, currency: 'RUB' },
                },
                {
                    id: '203',
                    name: 'Хот-дог',
                    description: 'Сочная сосиска в мягкой булочке с кетчупом и горчицей.',
                    image: { url: pepperoni, name: 'hotdog' },
                    price: { amount: 159, currency: 'RUB' },
                },
            ],
        },
        {
            id: '3',
            name: 'Сладости',
            priority: 3,
            image: { url: pepperoni, name: 'sweets' },
            products: [
                {
                    id: '301',
                    name: 'Шоколадный торт',
                    description: 'Воздушный бисквит с шоколадным кремом.',
                    image: { url: pepperoni, name: 'choco_cake' },
                    price: { amount: 299, currency: 'RUB' },
                },
                {
                    id: '302',
                    name: 'Мороженое ванильное',
                    description: 'Нежное мороженое из натуральных ингредиентов.',
                    image: { url: pepperoni, name: 'ice_cream' },
                    price: { amount: 99, currency: 'RUB' },
                    parameters: [
                        { text: 'Маленькая порция', price: { amount: 99, currency: 'RUB' } },
                        { text: 'Средняя порция', price: { amount: 149, currency: 'RUB' } },
                        { text: 'Большая порция', price: { amount: 199, currency: 'RUB' } },
                    ],
                },
            ],
        },
        {
            id: '4',
            name: 'Фрукты',
            priority: 4,
            image: { url: pepperoni, name: 'fruits' },
            products: [
                {
                    id: '401',
                    name: 'Бананы',
                    description: 'Спелые и сладкие бананы.',
                    image: { url: pepperoni, name: 'bananas' },
                    price: { amount: 120, currency: 'RUB' },
                    parameters: [
                        { text: '1 кг', price: { amount: 120, currency: 'RUB' } },
                        { text: '2 кг', price: { amount: 230, currency: 'RUB' } },
                    ],
                },
                {
                    id: '402',
                    name: 'Яблоки',
                    description: 'Сочные яблоки сорта Гренни Смит.',
                    image: { url: pepperoni, name: 'apples' },
                    price: { amount: 150, currency: 'RUB' },
                },
            ],
        },
        {
            id: '5',
            name: 'Молочные продукты',
            priority: 5,
            image: { url: pepperoni, name: 'dairy' },
            products: [
                {
                    id: '501',
                    name: 'Молоко 3.2%',
                    description: 'Натуральное пастеризованное молоко.',
                    image: { url: pepperoni, name: 'milk' },
                    price: { amount: 90, currency: 'RUB' },
                    parameters: [
                        { text: '0.5л', price: { amount: 90, currency: 'RUB' } },
                        { text: '1л', price: { amount: 140, currency: 'RUB' } },
                    ],
                },
                {
                    id: '502',
                    name: 'Творог 5%',
                    description: 'Свежий творог средней жирности.',
                    image: { url: pepperoni, name: 'cottage_cheese' },
                    price: { amount: 180, currency: 'RUB' },
                },
                {
                    id: '503',
                    name: 'Йогурт клубничный',
                    description: 'Натуральный йогурт с кусочками клубники.',
                    image: { url: pepperoni, name: 'yogurt' },
                    price: { amount: 75, currency: 'RUB' },
                },
            ],
        },
    ],
};
