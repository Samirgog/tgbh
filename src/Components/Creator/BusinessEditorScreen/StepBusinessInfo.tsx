import { Controller, useForm } from 'react-hook-form';
import { useBusinessEditorStore } from '@/Store/BusinessEditor';
import styled from 'styled-components';
import { Input } from '@/Components/Input';
import { StepBusinessEditor } from '@/Enums';
import { Button } from '@/Components/Button';
import { FunctionComponent } from 'react';
import { Text } from '@/Components/Typography';
import { FileUploader } from '@/Components/FileUploader';

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
        setStep(StepBusinessEditor.PAYMENT_INFO);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <InputsWrapper>
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
                <UploaderZone>
                    <Text size="b1">Добавьте баннер для своей компании*</Text>
                    <Text size="b3" color="secondary">
                        * Изображение будет видно всем клиентам на главной странице вашего бизнес—магазина
                    </Text>
                    <FileUploader />
                </UploaderZone>
            </InputsWrapper>
            <ButtonWrapper>
                <Button type="submit" disabled={!isValid}>
                    Продолжить
                </Button>
            </ButtonWrapper>
        </Form>
    );
};
