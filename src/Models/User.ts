export enum PaymentType {
    CASH = 'cash',
    SBP = 'sbp',
    CARD = 'card',
}

export enum PaymentCondition {
    PREPAYMENT = 'prepayment',
    UPON_RECEIPT = 'upon_receipt',
}

export enum ReceiveWays {
    PICKUP = 'pickup',
    DELIVERY = 'delivery',
}

export type ConsumerThemeColors = {
    background: string;
    accent: string;
    cardBackground: string;
    cardBorder: string;
    general?: string;
    secondary?: string;
    white?: string;
};

export type ConsumerTheme = {
    colors: ConsumerThemeColors;
};

export type Price = {
    amount?: number;
    currency?: string;
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

export type PersonalInfo = {
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    isCompanyOwner?: boolean;
    acceptedTerms?: boolean;
    avatar?: string;
};

export type StorePayment = {
    types: PaymentType[];
    conditions: PaymentCondition[];
};

export type Store = {
    id: string;
    name: string;
    description?: string;
    bannerUrl?: string;
    bannerName?: string;
};

export type StoreWithDetails = {
    catalog: Catalog;
    payment: StorePayment;
    receiveWays: ReceiveWays[];
    active?: boolean;
    theme?: ConsumerTheme;
};

export type User = {
    id: string;
    telegramId: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    role: 'ADMIN' | 'STORE_OWNER' | 'CUSTOMER';
    ownedStores?: Store[];
    employeeAt?: Store[];
    // orders?: Order[];
};
