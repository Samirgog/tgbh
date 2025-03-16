import { Controller, useForm } from 'react-hook-form';
import { useBusinessEditorStore } from '@/Store/BusinessEditor';
import styled from 'styled-components';
import { Input } from '@/Components/Input';
import { Checkbox } from '@/Components/Checkbox';
import { StepBusinessEditor } from '@/Enums';
import { Button } from '@/Components/Button';
import { FunctionComponent } from 'react';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
`;

type PersonalInfoForm = {
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    isCompanyOwner: boolean;
    acceptedTerms: boolean;
};

export const StepPersonalInfo: FunctionComponent = () => {
    const { personalInfo, updatePersonalInfo, setStep } = useBusinessEditorStore();
    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<PersonalInfoForm>({
        defaultValues: personalInfo,
        mode: 'onChange',
    });

    const onSubmit = (data: PersonalInfoForm) => {
        updatePersonalInfo(data);
        setStep(StepBusinessEditor.BUSINESS_INFO);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="firstName"
                control={control}
                render={({ field }) => <Input {...field} label="Имя" placeholder="Введите имя" />}
            />
            <Controller
                name="lastName"
                control={control}
                render={({ field }) => <Input {...field} label="Фамилия" placeholder="Введите фамилию" />}
            />
            <Controller
                name="middleName"
                control={control}
                render={({ field }) => (
                    <Input {...field} label="Отчество (при наличии)" placeholder="Введите отчество" />
                )}
            />
            <Controller
                name="isCompanyOwner"
                control={control}
                render={({ field }) => (
                    <Checkbox checked={field.value} onChange={field.onChange} label="Я являюсь владельцем компании" />
                )}
            />
            <Controller
                name="email"
                control={control}
                render={({ field }) => <Input {...field} label="Ваша почта" placeholder="Введите email" />}
            />
            <Controller
                name="acceptedTerms"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <Checkbox
                        checked={field.value}
                        onChange={field.onChange}
                        label="Я согласен на обработку персональных данных"
                    />
                )}
            />
            <Button type="submit" disabled={!isValid}>
                Продолжить
            </Button>
        </Form>
    );
};
