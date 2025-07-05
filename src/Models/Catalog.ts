export type Price = {
    amount?: number;
    currency: string;
};

export type Parameter = { text: string; id?: string; price?: Price };

export type Product = {
    id: string;
    name: string;
    description?: string;
    image?: { url: string | null; name: string };
    price?: Price;
    parameters?: Parameter[];
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

export type CartItem = {
    product: Product;
    quantity: number;
    parameter?: Parameter;
};

export type Address = {
    value: string;
    coords?: [number, number];
};
