import { create } from 'zustand';

import { StepBusinessEditor } from '@/Enums';
import { PersonalInfo } from '@/Models/Business';
import { Catalog, Category, Product } from '@/Models/Catalog';
import { ConsumerTheme } from '@/Models/Theme';
import { consumerTheme } from '@/Styles/theme';

type BusinessInfo = {
    name: string;
    description: string;
    banner?: { url?: string; name?: string };
};

type PaymentInfo = {
    types: string[];
    conditions: string[];
};

type ReceiveInfo = {
    ways: string[];
};

type BusinessEditorStore = {
    mode: 'add' | 'edit';
    step: StepBusinessEditor;
    personalInfo: PersonalInfo;
    businessInfo: BusinessInfo;
    paymentInfo: PaymentInfo;
    receiveInfo: ReceiveInfo;
    catalog: Catalog;
    theme: ConsumerTheme;

    setMode: (mode: 'add' | 'edit') => void;
    setStep: (step: StepBusinessEditor) => void;

    updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
    updateBusinessInfo: (data: Partial<BusinessInfo>) => void;
    updatePaymentInfo: (data: Partial<PaymentInfo>) => void;
    updateReceiveInfo: (data: Partial<ReceiveInfo>) => void;

    updateCatalog: (catalog: Partial<Catalog>) => void;
    addCategory: (category: Category) => void;
    updateCategory: (data: Partial<Category>) => void;
    removeCategory: (id: string) => void;

    addProductToCategory: (data: { categoryId: string; product: Product }) => void;
    removeProductFromCategory: (data: { categoryId: string; productId: string }) => void;
    updateProduct: (data: Partial<Product>) => void;

    updateTheme: (data: Partial<ConsumerTheme>) => void;
};

export const useBusinessEditorStore = create<BusinessEditorStore>((set) => ({
    mode: 'add',
    step: StepBusinessEditor.PERSONAL_INFO,
    personalInfo: {
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        isCompanyOwner: false,
        acceptedTerms: false,
    },
    businessInfo: {
        name: '',
        description: '',
        banner: { url: '', name: '' },
    },
    paymentInfo: {
        types: [],
        conditions: [],
    },
    receiveInfo: {
        ways: [],
    },
    catalog: {
        categories: [],
    },
    theme: consumerTheme.default,

    setMode: (mode) => set({ mode }),
    setStep: (step) => set({ step }),
    updatePersonalInfo: (data) => set((state) => ({ personalInfo: { ...state.personalInfo, ...data } })),
    updateBusinessInfo: (data) => set((state) => ({ businessInfo: { ...state.businessInfo, ...data } })),
    updatePaymentInfo: (data) => set((state) => ({ paymentInfo: { ...state.paymentInfo, ...data } })),
    updateReceiveInfo: (data) => set((state) => ({ receiveInfo: { ...state.receiveInfo, ...data } })),

    updateCatalog: (data) => set((state) => ({ catalog: { ...state.catalog, ...data } })),
    addCategory: (category) =>
        set((state) => ({ catalog: { ...state.catalog, categories: [...state.catalog.categories, category] } })),
    updateCategory: (data) =>
        set((state) => ({
            catalog: {
                ...state.catalog,
                categories: state.catalog.categories.map((category) => {
                    if (category.id === data.id) {
                        return { ...category, ...data };
                    }

                    return category;
                }),
            },
        })),
    removeCategory: (id) =>
        set((state) => ({
            catalog: {
                ...state.catalog,
                categories: state.catalog.categories.filter((category) => category.id !== id),
            },
        })),

    addProductToCategory: ({ categoryId, product }) =>
        set((state) => ({
            catalog: {
                ...state.catalog,
                categories: state.catalog.categories.map((category) => {
                    if (category.id === categoryId) {
                        return { ...category, products: [...(category.products ?? []), product] };
                    }

                    return category;
                }),
            },
        })),
    removeProductFromCategory: ({ categoryId, productId }) =>
        set((state) => ({
            catalog: {
                ...state.catalog,
                categories: state.catalog.categories.map((category) => {
                    if (category.id === categoryId) {
                        return {
                            ...category,
                            products: category.products?.filter((product) => product.id !== productId),
                        };
                    }

                    return category;
                }),
            },
        })),
    updateProduct: (data) =>
        set((state) => ({
            catalog: {
                ...state.catalog,
                categories: state.catalog.categories.map((category) => {
                    return {
                        ...category,
                        products: category.products?.map((product) => {
                            if (product.id === data.id) {
                                return { ...product, ...data };
                            }

                            return product;
                        }),
                    };
                }),
            },
        })),

    updateTheme: (data) => set((state) => ({ theme: { ...state.theme, ...data } })),
}));
