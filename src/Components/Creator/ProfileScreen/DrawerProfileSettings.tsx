import { FunctionComponent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { Button, Drawer, Input } from '@/Components/@ui-kit';
import { PersonalInfo } from '@/Models/User';

const EditWrapper = styled.form`
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-self: center;
    margin-top: auto;
`;

type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (nextUser?: Partial<PersonalInfo>) => void;
    user: PersonalInfo;
};

type Form = {
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
};

export const DrawerProfileSettings: FunctionComponent<Props> = ({ open, onClose, onSave, user }) => {
    const { control, handleSubmit } = useForm<Form>({
        defaultValues: user,
    });

    const onSubmit = (form: Form) => {
        onSave?.(form);
    };

    return (
        <Drawer open={open} onClose={onClose}>
            <EditWrapper onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => <Input {...field} label="Фамилия" placeholder="Введите фамилию" />}
                />
                <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => <Input {...field} label="Имя" placeholder="Введите имя" />}
                />
                <Controller
                    name="middleName"
                    control={control}
                    render={({ field }) => <Input {...field} label="Отчество" placeholder="Введите отчество" />}
                />
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <Input {...field} label="Электронная почта" placeholder="Введите email" />}
                />
                <ButtonWrapper>
                    <Button type="submit">Сохранить</Button>
                </ButtonWrapper>
            </EditWrapper>
        </Drawer>
    );
};
