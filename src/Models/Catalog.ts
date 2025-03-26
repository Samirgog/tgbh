export type Price = {
    amount?: number;
    currency: string;
};

export type Product = {
    id: string;
    name: string;
    description?: string;
    image?: { url: string | null; name: string };
    price?: Price;
    parameters?: { text: string; price?: Price }[];
};

export type Category = {
    id: string;
    name: string;
    priority: number;
    image?: { url: string | null; name: string };
    products?: Product[];
};

export type Catalog = {
    categories: Category[];
};
