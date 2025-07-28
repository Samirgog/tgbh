import { FunctionComponent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import placeholderImage from '@/assets/placeholder_image.png';
import { Button } from '@/Components/@ui-kit/Button';
import { Drawer } from '@/Components/@ui-kit/Drawer';
import { FileUploader } from '@/Components/@ui-kit/FileUploader';
import { Input } from '@/Components/@ui-kit/Input';
import { Title } from '@/Components/@ui-kit/Typography';
import { PreviewZone } from '@/Components/Creator/BusinessEditorScreen/Components/PreviewZone';
import { CategoryChip } from '@/Components/Customizable/CategoryChip';
import { Category } from '@/Models/Catalog';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
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

type CategoryForm = {
    name: string;
    image: {
        url: string | null;
        name: string;
    };
};

type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (category: Category) => void;
    category?: Category;
};

export const DrawerCategoryChip: FunctionComponent<Props> = ({ open = false, onClose, onSave, category }) => {
    const { control, handleSubmit, watch, reset } = useForm<CategoryForm>({
        defaultValues: category,
    });
    const [selected, setSelected] = useState(false);

    const name = watch('name');
    const image = watch('image');

    useEffect(() => {
        if (category) {
            reset(category);
        } else {
            reset({ name: '', image: undefined });
        }
    }, [category, reset]);

    const handleToggleSelected = () => {
        setSelected((prev) => !prev);
    };

    const onSubmit = (form: CategoryForm) => {
        onSave({
            id: category?.id ?? uuid(),
            priority: category?.priority ?? 0,
            ...form,
        });
        reset({ name: '', image: undefined });
        onClose();
    };

    return (
        <Drawer open={open} onClose={onClose}>
            <Container>
                <Title size="h5">Превью карточки категории</Title>
                <PreviewZone>
                    <CategoryChip onClick={handleToggleSelected} selected={selected} style={{ minWidth: '108px' }}>
                        <CategoryChip.Image imageSrc={image?.url || category?.image?.url || placeholderImage} />
                        <CategoryChip.Content>{name || category?.name}</CategoryChip.Content>
                    </CategoryChip>
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
                            name="image"
                            render={({ field: { value, onChange } }) => (
                                <FileUploader
                                    label="Загрузить изображение"
                                    defaultImage={value}
                                    onFileUpload={onChange}
                                />
                            )}
                        />
                    </FormInner>
                    <Button type="submit" style={{ marginTop: '16px', marginBottom: '8px' }}>
                        Сохранить
                    </Button>
                </Form>
            </Container>
        </Drawer>
    );
};
