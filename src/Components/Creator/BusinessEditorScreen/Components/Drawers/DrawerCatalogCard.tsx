import { PlusCircle, Trash } from 'lucide-react';
import React, { FunctionComponent, useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import placeholderImage from '@/assets/placeholder_image.png';
import { Button } from '@/Components/@ui-kit/Button';
import { Checkbox } from '@/Components/@ui-kit/Checkbox';
import { Drawer } from '@/Components/@ui-kit/Drawer';
import { FileUploader } from '@/Components/@ui-kit/FileUploader';
import { Input } from '@/Components/@ui-kit/Input';
import { Title } from '@/Components/@ui-kit/Typography';
import { PreviewZone } from '@/Components/Creator/BusinessEditorScreen/Components/PreviewZone';
import { CatalogCard } from '@/Components/Customizable/CatalogCard';
import { RUBLE_SYMBOL } from '@/Consts';
import { Product } from '@/Models/Catalog';

const MAX_PARAMETERS_COUNT = 3;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
    height: 100%;
    overflow: auto;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const FormInner = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    gap: ${({ theme }) => theme.spacing(1)};
`;

const CardWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
`;

const ParamRow = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(1)};
`;

const IconButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
`;

const AddIcon = styled.div`
    display: flex;
    justify-content: flex-start;
`;

type ProductForm = {
    name: string;
    description: string;
    price: {
        amount: number;
    };
    image: {
        url: string | null;
        name: string;
    };
    parameters: {
        text: string;
        price?: {
            amount?: number;
        };
    }[];
    addParameters: boolean;
};

type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (products: Product) => void;
    product?: Product;
};

export const DrawerCatalogCard: FunctionComponent<Props> = ({ open, onClose, onSave, product }) => {
    const { control, handleSubmit, watch, reset } = useForm<ProductForm>({
        defaultValues: {
            ...product,
            addParameters: Boolean(product?.parameters?.length),
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'parameters',
    });

    const name = watch('name');
    const description = watch('description');
    const amount = watch('price.amount');
    const image = watch('image');
    const addParameters = watch('addParameters');

    useEffect(() => {
        if (product) {
            reset(product);
        } else {
            reset({ name: '', description: '', price: undefined, image: undefined, parameters: [] });
        }
    }, [product, reset]);

    useEffect(() => {
        if (!addParameters) {
            remove();
        }
    }, [addParameters, remove]);

    const onSubmit = (form: ProductForm) => {
        onSave({
            ...form,
            id: product?.id ?? uuid(),
            price: {
                currency: RUBLE_SYMBOL,
                amount: form.price.amount,
            },
            parameters: form.parameters?.map((parameter) => ({
                ...parameter,
                price: { ...parameter.price, currency: RUBLE_SYMBOL },
            })),
        });
        reset({ name: '', description: '', price: undefined, image: undefined, parameters: [] });
        onClose();
    };

    return (
        <Drawer open={open} onClose={onClose}>
            <Container>
                <Title size="h5">Превью карточки товара</Title>
                <PreviewZone>
                    <CardWrapper>
                        <CatalogCard style={{ width: '168px', flex: 'none' }}>
                            <CatalogCard.Image imageSrc={image?.url || product?.image?.url || placeholderImage} />
                            <CatalogCard.Content>
                                <CatalogCard.Content.Title>{name || product?.name}</CatalogCard.Content.Title>
                                <CatalogCard.Content.Description>
                                    {description || product?.description}
                                </CatalogCard.Content.Description>
                                <CatalogCard.Content.Price
                                    currency={amount ? RUBLE_SYMBOL : undefined}
                                    amount={amount || product?.price?.amount}
                                />
                            </CatalogCard.Content>
                        </CatalogCard>
                    </CardWrapper>
                </PreviewZone>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormInner>
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
                        <Controller
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <Input label="Название" placeholder="Введите название товара" {...field} />
                            )}
                        />
                        <Controller
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <Input label="Описание" placeholder="Введите описание товара" {...field} />
                            )}
                        />
                        <InputWrapper>
                            <Controller
                                control={control}
                                name="price.amount"
                                render={({ field }) => (
                                    <Input label="Стоимость" placeholder="Введите стоимость" {...field} />
                                )}
                            />
                            <Title size="h2">{RUBLE_SYMBOL}</Title>
                        </InputWrapper>
                        <Controller
                            name="addParameters"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    checked={field.value}
                                    onChange={field.onChange}
                                    label="Дополнительные параметры товара"
                                />
                            )}
                        />
                        {addParameters &&
                            fields.map((field, index) => (
                                <ParamRow key={field.id}>
                                    <Controller
                                        name={`parameters.${index}.text`}
                                        control={control}
                                        render={({ field }) => <Input {...field} placeholder="Параметр" />}
                                    />
                                    <Controller
                                        name={`parameters.${index}.price.amount`}
                                        control={control}
                                        render={({ field }) => <Input {...field} placeholder="Цена" />}
                                    />
                                    <IconButton type="button" onClick={() => remove(index)}>
                                        <Trash
                                            size={20}
                                            style={{ color: 'var(--tg-theme-destructive-text-color, #df3f40)' }}
                                        />
                                    </IconButton>
                                </ParamRow>
                            ))}
                        {addParameters && fields.length < MAX_PARAMETERS_COUNT && (
                            <AddIcon>
                                <IconButton type="button" onClick={() => append({ text: '' })}>
                                    <PlusCircle size={24} color="blue" />
                                </IconButton>
                            </AddIcon>
                        )}
                    </FormInner>
                    <Button type="submit" style={{ marginTop: '16px', marginBottom: '8px' }}>
                        Сохранить
                    </Button>
                </Form>
            </Container>
        </Drawer>
    );
};
