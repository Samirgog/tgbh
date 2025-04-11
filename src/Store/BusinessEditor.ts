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
    stepHistory: StepBusinessEditor[];
    personalInfo: PersonalInfo;
    businessInfo: BusinessInfo;
    paymentInfo: PaymentInfo;
    receiveInfo: ReceiveInfo;
    catalog: Catalog;
    theme: ConsumerTheme;

    setMode: (mode: 'add' | 'edit') => void;
    setStep: (step: StepBusinessEditor) => void;
    goBack: () => void;

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

    resetStore: () => void;
};

const initialState: Omit<
    BusinessEditorStore,
    | 'setMode'
    | 'setStep'
    | 'updatePersonalInfo'
    | 'updateBusinessInfo'
    | 'updatePaymentInfo'
    | 'updateReceiveInfo'
    | 'updateCatalog'
    | 'addCategory'
    | 'updateCategory'
    | 'removeCategory'
    | 'addProductToCategory'
    | 'removeProductFromCategory'
    | 'updateProduct'
    | 'updateTheme'
    | 'resetStore'
    | 'goBack'
> = {
    mode: 'add',
    step: StepBusinessEditor.PERSONAL_INFO,
    stepHistory: [StepBusinessEditor.PERSONAL_INFO],
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
};

export const useBusinessEditorStore = create<BusinessEditorStore>((set, get) => ({
    ...initialState,

    setMode: (mode) => set({ mode }),
    setStep: (newStep: StepBusinessEditor) => {
        const { stepHistory } = get();
        if (newStep !== stepHistory[stepHistory.length - 1]) {
            set({
                step: newStep,
                stepHistory: [...stepHistory, newStep],
            });
        }
    },

    goBack: () => {
        const { stepHistory } = get();
        if (stepHistory.length > 1) {
            const updatedHistory = stepHistory.slice(0, -1);
            const prevStep = updatedHistory[updatedHistory.length - 1];
            set({
                step: prevStep,
                stepHistory: updatedHistory,
            });
        }
    },
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
                categories: state.catalog.categories.map((category) =>
                    category.id === data.id ? { ...category, ...data } : category,
                ),
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
                categories: state.catalog.categories.map((category) =>
                    category.id === categoryId
                        ? { ...category, products: [...(category.products ?? []), product] }
                        : category,
                ),
            },
        })),
    removeProductFromCategory: ({ categoryId, productId }) =>
        set((state) => ({
            catalog: {
                ...state.catalog,
                categories: state.catalog.categories.map((category) =>
                    category.id === categoryId
                        ? { ...category, products: category.products?.filter((product) => product.id !== productId) }
                        : category,
                ),
            },
        })),
    updateProduct: (data) =>
        set((state) => ({
            catalog: {
                ...state.catalog,
                categories: state.catalog.categories.map((category) => ({
                    ...category,
                    products: category.products?.map((product) =>
                        product.id === data.id ? { ...product, ...data } : product,
                    ),
                })),
            },
        })),

    updateTheme: (data) => set((state) => ({ theme: { ...state.theme, ...data } })),

    resetStore: () => set(initialState),
}));
