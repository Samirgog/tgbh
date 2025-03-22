import { Pointer } from 'lucide-react';
import React, { FunctionComponent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import { Button } from '@/Components/Button';
import { CategoryImageStub } from '@/Components/Creator/BusinessEditorScreen/Components/CategoryImageStub';
import { PreviewZone } from '@/Components/Creator/BusinessEditorScreen/Components/PreviewZone';
import { CategoryChip } from '@/Components/Customizable/CategoryChip';
import { Drawer } from '@/Components/Drawer';
import { FileUploader } from '@/Components/FileUploader';
import { Input } from '@/Components/Input';
import { Title } from '@/Components/Typography';
import { Category } from '@/Models/Catalog';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(3)};
    height: 100%;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

const FormInner = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-self: center;
`;

type CategoryForm = {
    name: string;
    imageUrl: string;
};

type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (category: Category) => void;
    category?: Category;
};

export const DrawerCategoryChip: FunctionComponent<Props> = ({ open = false, onClose, onSave, category }) => {
    const { control, handleSubmit } = useForm<CategoryForm>({
        defaultValues: category,
    });
    const [selected, setSelected] = useState(false);

    const handleToggleSelected = () => {
        setSelected((prev) => !prev);
    };

    const onSubmit = (form: CategoryForm) => {
        onSave({
            id: category?.id ?? uuid(),
            priority: category?.priority ?? 0,
            ...form,
            imageUrl:
                'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        });
        onClose();
    };

    return (
        <Drawer open={open} onClose={onClose}>
            <Container>
                <Title size="h5">Превью карточки категории</Title>
                <PreviewZone>
                    <Controller
                        control={control}
                        render={({ field: { value } }) => (
                            <CategoryChip
                                onClick={handleToggleSelected}
                                selected={selected}
                                style={{ minWidth: '108px' }}
                            >
                                <CategoryChip.Image
                                    imageSrc={category?.imageUrl}
                                    stub={!category?.imageUrl ? <CategoryImageStub /> : undefined}
                                />
                                <CategoryChip.Content>{value}</CategoryChip.Content>
                            </CategoryChip>
                        )}
                        name="name"
                    />
                </PreviewZone>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormInner>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <Input label="Название" placeholder="Введите название категории" {...field} />
                            )}
                        />
                        <Controller
                            control={control}
                            name="imageUrl"
                            render={() => <FileUploader label="Загрузить изображение" />}
                        />
                    </FormInner>
                    <ButtonWrapper>
                        <Button type="submit">Сохранить</Button>
                    </ButtonWrapper>
                </Form>
            </Container>
        </Drawer>
    );
};
