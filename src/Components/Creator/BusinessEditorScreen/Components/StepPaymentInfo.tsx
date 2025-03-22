import styled from 'styled-components';
import { FunctionComponent } from 'react';
import { useBusinessEditorStore } from '@/Store/BusinessEditor';
import { Text, Title } from '@/Components/Typography';
import { MultiSelect } from '@/Components/MultiSelect';
import { Controller, useForm } from 'react-hook-form';
import { PaymentCondition, PaymentType, StepBusinessEditor } from '@/Enums';
import { Button } from '@/Components/Button';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

const FormInner = styled.form`
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: ${({ theme }) => theme.spacing(3)};
`;

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(1)};
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-self: center;
`;

type PaymentInfoForm = {
    types: string[];
    conditions: string[];
};

type Option = { label: string; value: string };

const OPTIONS_PAYMENT_TYPE: Option[] = [
    { label: 'СБП', value: PaymentType.SBP },
    { label: 'Картой онлайн', value: PaymentType.CARD },
    { label: 'Наличные', value: PaymentType.CASH },
];

const OPTIONS_PAYMENT_CONDITIONS: Option[] = [
    { label: 'Предоплата', value: PaymentCondition.PREPAYMENT },
    { label: 'При получении', value: PaymentCondition.UPON_RECEIPT },
];

const getPaymentTypeValues = (types: string[]) => {
    return OPTIONS_PAYMENT_TYPE.filter((type) => types.includes(type.value as PaymentType));
};

const getPaymentConditionValues = (types: string[]) => {
    return OPTIONS_PAYMENT_CONDITIONS.filter((type) => types.includes(type.value as PaymentCondition));
};

export const StepPaymentInfo: FunctionComponent = () => {
    const { paymentInfo, updatePaymentInfo, setStep } = useBusinessEditorStore();

    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<PaymentInfoForm>({
        defaultValues: paymentInfo,
    });

    const onSubmit = (data: PaymentInfoForm) => {
        updatePaymentInfo(data);
        setStep(StepBusinessEditor.RECEIVE_INFO);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormInner>
                <Container>
                    <TitleWrapper>
                        <Title size="h5" weight="medium">
                            Выберите способы оплаты*
                        </Title>
                        <Text size="b3" color="secondary">
                            * При оформлении заказа клиенту будут предложены выбранные Вами способы оплаты
                        </Text>
                    </TitleWrapper>
                    <Controller
                        control={control}
                        name="types"
                        render={({ field: { value, onChange } }) => (
                            <MultiSelect
                                options={OPTIONS_PAYMENT_TYPE}
                                values={getPaymentTypeValues(value)}
                                onSelect={onChange}
                            />
                        )}
                    />
                </Container>
                <Container>
                    <TitleWrapper>
                        <Title size="h5" weight="medium">
                            Выберите условия оплаты*
                        </Title>
                        <Text size="b3" color="secondary">
                            * При оформлении заказа клиенту будут предложены выбранные Вами условия оплаты
                        </Text>
                    </TitleWrapper>
                    <Controller
                        control={control}
                        name="conditions"
                        render={({ field: { value, onChange } }) => (
                            <MultiSelect
                                options={OPTIONS_PAYMENT_CONDITIONS}
                                values={getPaymentConditionValues(value)}
                                onSelect={onChange}
                            />
                        )}
                    />
                </Container>
            </FormInner>
            <ButtonWrapper>
                <Button type="submit" disabled={!isValid}>
                    Продолжить
                </Button>
            </ButtonWrapper>
        </Form>
    );
};
