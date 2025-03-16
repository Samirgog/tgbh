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

type BusinessEditorStore = {
    step: StepBusinessEditor;
    personalInfo: PersonalInfo;
    businessInfo: BusinessInfo;
    setStep: (step: StepBusinessEditor) => void;
    updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
    updateBusinessInfo: (data: Partial<BusinessInfo>) => void;
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
    setStep: (step) => set({ step }),
    updatePersonalInfo: (data) => set((state) => ({ personalInfo: { ...state.personalInfo, ...data } })),
    updateBusinessInfo: (data) => set((state) => ({ businessInfo: { ...state.businessInfo, ...data } })),
}));
