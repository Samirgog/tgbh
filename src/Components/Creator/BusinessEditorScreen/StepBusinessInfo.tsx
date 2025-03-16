import { Controller, useForm } from 'react-hook-form';
import { useBusinessEditorStore } from '@/Store/BusinessEditor';
import styled from 'styled-components';
import { Input } from '@/Components/Input';
import { StepBusinessEditor } from '@/Enums';
import { Button } from '@/Components/Button';
import { FunctionComponent } from 'react';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
`;

type BusinessInfoForm = {
    name: string;
    description: string;
};

export const StepBusinessInfo: FunctionComponent = () => {
    const { businessInfo, updateBusinessInfo, setStep } = useBusinessEditorStore();
    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<BusinessInfoForm>({
        defaultValues: businessInfo,
        mode: 'onChange',
    });

    const onSubmit = (data: BusinessInfoForm) => {
        updateBusinessInfo(data);
        setStep(StepBusinessEditor.BUSINESS_INFO);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <Input {...field} label="Название вашего Бизнеса" placeholder="Введите название" />
                )}
            />
            <Controller
                name="description"
                control={control}
                render={({ field }) => <Input {...field} label="Описание" placeholder="Введите описание" />}
            />
            <Button type="submit" disabled={!isValid}>
                Продолжить
            </Button>
        </Form>
    );
};
