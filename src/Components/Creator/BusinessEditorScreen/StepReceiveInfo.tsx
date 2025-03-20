import React, { FunctionComponent } from 'react';
import { ReceiveWays, StepBusinessEditor } from '@/Enums';
import styled from 'styled-components';
import { Text, Title } from '@/Components/Typography';
import { Controller, useForm } from 'react-hook-form';
import { MultiSelect } from '@/Components/MultiSelect';
import { Button } from '@/Components/Button';
import { useBusinessEditorStore } from '@/Store/BusinessEditor';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
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

type ReceiveInfoForm = {
    ways: string[];
};

type Option = { label: string; value: string };

const OPTIONS_RECEIVE_WAYS: Option[] = [
    { label: 'Самовывоз', value: ReceiveWays.PICKUP },
    { label: 'Доставка', value: ReceiveWays.DELIVERY },
];

const getReceiveWayValues = (types: string[]) => {
    return OPTIONS_RECEIVE_WAYS.filter((type) => types.includes(type.value as ReceiveWays));
};

export const StepReceiveInfo: FunctionComponent = () => {
    const { receiveInfo, updateReceiveInfo, setStep } = useBusinessEditorStore();

    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<ReceiveInfoForm>({
        defaultValues: receiveInfo,
    });

    const onSubmit = (data: ReceiveInfoForm) => {
        updateReceiveInfo(data);
        setStep(StepBusinessEditor.RECEIVE_INFO);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Container>
                <TitleWrapper>
                    <Title size="h5" weight="medium">
                        Выберите способы получения*
                    </Title>
                    <Text size="b3" color="secondary">
                        * При оформлении заказа клиенту будут предложены выбранные Вами способы получения заказа
                    </Text>
                </TitleWrapper>
                <Controller
                    control={control}
                    name="ways"
                    render={({ field: { value, onChange } }) => (
                        <MultiSelect
                            options={OPTIONS_RECEIVE_WAYS}
                            values={getReceiveWayValues(value)}
                            onSelect={onChange}
                        />
                    )}
                />
            </Container>
            <ButtonWrapper>
                <Button type="submit" disabled={!isValid}>
                    Продолжить
                </Button>
            </ButtonWrapper>
        </Form>
    );
};
