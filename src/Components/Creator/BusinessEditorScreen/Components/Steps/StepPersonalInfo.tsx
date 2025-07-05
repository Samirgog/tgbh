import { FunctionComponent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { Button } from '@/Components/@ui-kit/Button';
import { Checkbox } from '@/Components/@ui-kit/Checkbox';
import { Input } from '@/Components/@ui-kit/Input';
import { StepBusinessEditor } from '@/Enums';
import { useBusinessEditorStore } from '@/Store/BusinessEditor';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

const FormInner = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(4)};
`;

const InputsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-self: center;
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
    const { control, handleSubmit } = useForm<PersonalInfoForm>({
        defaultValues: personalInfo,
        mode: 'onChange',
    });

    const onSubmit = (data: PersonalInfoForm) => {
        updatePersonalInfo(data);
        setStep(StepBusinessEditor.BUSINESS_INFO);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormInner>
                <InputsWrapper>
                    <Controller
                        name="firstName"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, fieldState: { invalid } }) => (
                            <Input {...field} invalid={invalid} label="Имя" placeholder="Введите имя" />
                        )}
                    />
                    <Controller
                        name="lastName"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, fieldState: { invalid } }) => (
                            <Input {...field} invalid={invalid} label="Фамилия" placeholder="Введите фамилию" />
                        )}
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
                            <Checkbox
                                checked={field.value}
                                onChange={field.onChange}
                                label="Я являюсь владельцем компании"
                            />
                        )}
                    />
                </InputsWrapper>
                <InputsWrapper>
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, fieldState: { invalid } }) => (
                            <Input {...field} invalid={invalid} label="Ваша почта" placeholder="Введите email" />
                        )}
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
                </InputsWrapper>
            </FormInner>
            <ButtonWrapper>
                <Button type="submit">Продолжить</Button>
            </ButtonWrapper>
        </Form>
    );
};
