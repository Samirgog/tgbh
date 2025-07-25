import React, { FunctionComponent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '@/Components/@ui-kit/Button';
import { MultiSelect } from '@/Components/@ui-kit/MultiSelect';
import { Text, Title } from '@/Components/@ui-kit/Typography';
import { ReceiveWays, StepBusinessEditor } from '@/Enums';
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
    const navigate = useNavigate();
    const { receiveInfo, updateReceiveInfo, mode, setStep } = useBusinessEditorStore();

    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<ReceiveInfoForm>({
        defaultValues: receiveInfo,
    });

    const onSubmit = (data: ReceiveInfoForm) => {
        updateReceiveInfo(data);

        if (mode === 'edit') {
            navigate(-1);

            return;
        }

        setStep(StepBusinessEditor.CATALOG_CONSTRUCTOR);
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
            <Button type="submit" disabled={!isValid}>
                {mode === 'edit' ? 'Сохранить' : 'Продолжить'}
            </Button>
        </Form>
    );
};
