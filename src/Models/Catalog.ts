export type Product = {
    id: string;
    name: string;
    description?: string;
    imageUrl?: string;
    price?: { amount: number; currency: string };
};

export type Category = {
    id: string;
    name: string;
    priority: number;
    imageUrl?: string;
    products?: Product[];
};

export type Catalog = {
    categories: Category[];
};
