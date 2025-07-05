import React, { FunctionComponent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '@/Components/@ui-kit/Button';
import { FileUploader } from '@/Components/@ui-kit/FileUploader';
import { Input } from '@/Components/@ui-kit/Input';
import { Text } from '@/Components/@ui-kit/Typography';
import { StepBusinessEditor } from '@/Enums';
import { useBusinessEditorStore } from '@/Store/BusinessEditor';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

const InputsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
`;

const UploaderZone = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(1)};
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-self: center;
`;

type BusinessInfoForm = {
    name: string;
    description: string;
    banner: {
        url?: string;
        name?: string;
    };
};

export const StepBusinessInfo: FunctionComponent = () => {
    const navigate = useNavigate();
    const { businessInfo, updateBusinessInfo, mode, setStep } = useBusinessEditorStore();
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

        if (mode === 'edit') {
            navigate(-1);

            return;
        }

        setStep(StepBusinessEditor.PAYMENT_INFO);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <InputsWrapper>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <Input {...field} label="Название вашего Магазина" placeholder="Введите название" />
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <Input {...field} label="Описание" placeholder="Введите описание" />}
                />
                <UploaderZone>
                    <Text size="b1">Добавьте баннер для магазина*</Text>
                    <Text size="b3" color="secondary">
                        * Изображение будет видно всем клиентам на главной странице вашего магазина
                    </Text>
                    <Controller
                        control={control}
                        name="banner"
                        render={({ field: { value, onChange } }) => (
                            <FileUploader label="Загрузить изображение" defaultImage={value} onFileUpload={onChange} />
                        )}
                    />
                </UploaderZone>
            </InputsWrapper>
            <ButtonWrapper>
                <Button type="submit" disabled={!isValid}>
                    {mode === 'edit' ? 'Сохранить' : 'Продолжить'}
                </Button>
            </ButtonWrapper>
        </Form>
    );
};
