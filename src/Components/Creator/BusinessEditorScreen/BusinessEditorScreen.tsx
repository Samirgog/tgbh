import { FunctionComponent } from 'react';
import { useBusinessEditorStore } from '@/Store/BusinessEditor';
import { StepBusinessEditor } from '@/Enums';
import { StepPersonalInfo } from '@/Components/Creator/BusinessEditorScreen/StepPersonalInfo';
import { StepBusinessInfo } from '@/Components/Creator/BusinessEditorScreen/StepBusinessInfo';

export const BusinessEditorScreen: FunctionComponent = () => {
    const { step } = useBusinessEditorStore();

    if (step === StepBusinessEditor.PERSONAL_INFO) {
        return <StepPersonalInfo />;
    }

    if (step === StepBusinessEditor.BUSINESS_INFO) {
        return <StepBusinessInfo />;
    }

    return null;
};
