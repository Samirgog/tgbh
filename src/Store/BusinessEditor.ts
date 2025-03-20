import { create } from 'zustand';
import { StepBusinessEditor } from '@/Enums';

type PersonalInfo = {
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    isCompanyOwner: boolean;
    acceptedTerms: boolean;
};

type BusinessInfo = {
    name: string;
    description: string;
};

type PaymentInfo = {
    types: string[];
    conditions: string[];
};

type ReceiveInfo = {
    ways: string[];
};

type BusinessEditorStore = {
    step: StepBusinessEditor;
    personalInfo: PersonalInfo;
    businessInfo: BusinessInfo;
    paymentInfo: PaymentInfo;
    receiveInfo: ReceiveInfo;
    setStep: (step: StepBusinessEditor) => void;
    updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
    updateBusinessInfo: (data: Partial<BusinessInfo>) => void;
    updatePaymentInfo: (data: Partial<PaymentInfo>) => void;
    updateReceiveInfo: (data: Partial<ReceiveInfo>) => void;
};

export const useBusinessEditorStore = create<BusinessEditorStore>((set) => ({
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
    },
    paymentInfo: {
        types: [],
        conditions: [],
    },
    receiveInfo: {
        ways: [],
    },
    setStep: (step) => set({ step }),
    updatePersonalInfo: (data) => set((state) => ({ personalInfo: { ...state.personalInfo, ...data } })),
    updateBusinessInfo: (data) => set((state) => ({ businessInfo: { ...state.businessInfo, ...data } })),
    updatePaymentInfo: (data) => set((state) => ({ paymentInfo: { ...state.paymentInfo, ...data } })),
    updateReceiveInfo: (data) => set((state) => ({ receiveInfo: { ...state.receiveInfo, ...data } })),
}));
