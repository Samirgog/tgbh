import { Link, Upload, X } from 'lucide-react';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    border: 2px dashed #ccc;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        border-color: #999;
    }
`;

const HiddenInput = styled.input`
    display: none;
`;

const PreviewContainer = styled.div`
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 8px;
    overflow: hidden;
`;

const PreviewImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const RemoveButton = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
`;

const UrlInput = styled.input`
    flex: 1;
    padding: 6px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    &:focus {
        border-color: #999;
    }
`;

const AddButton = styled.button`
    padding: 6px 10px;
    border: none;
    background: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        background: #0056b3;
    }
`;

export const UploadInput: FunctionComponent = () => {
    const [image, setImage] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
        setImageUrl(event.target.value);
    };

    const handleUrlSubmit = () => {
        if (imageUrl.trim() !== '') {
            setImage(imageUrl);
            setImageUrl('');
        }
    };

    const handleRemove = () => {
        setImage(null);
        setImageUrl('');
    };

    return (
        <Wrapper>
            {image ? (
                <PreviewContainer>
                    <PreviewImage src={image} alt="Preview" />
                    <RemoveButton onClick={handleRemove}>
                        <X size={16} color="#fff" />
                    </RemoveButton>
                </PreviewContainer>
            ) : (
                <>
                    <Label>
                        <Upload size={24} color="#999" />
                        <span>Загрузить</span>
                        <HiddenInput type="file" accept="image/*" onChange={handleFileChange} />
                    </Label>
                    <InputContainer>
                        <UrlInput
                            type="text"
                            placeholder="Вставьте ссылку на изображение"
                            value={imageUrl}
                            onChange={handleUrlChange}
                        />
                        <AddButton onClick={handleUrlSubmit}>
                            <Link size={16} color="#fff" />
                        </AddButton>
                    </InputContainer>
                </>
            )}
        </Wrapper>
    );
};
