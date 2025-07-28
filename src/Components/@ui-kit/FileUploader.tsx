import { Loader2, Paperclip, RotateCcw, X } from 'lucide-react';
import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { useUploadFile } from '@/api/hooks/useUploadFile';
import { Text } from '@/Components/@ui-kit/Typography';

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(1)};
    cursor: pointer;
    color: var(--tg-theme-button-color, #007aff);
    font-size: 16px;
    padding: 8px 0;
`;

const FileItem = styled.div<{ $status?: 'success' | 'error' }>`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(2)};
    width: 100%;
    padding: 8px;

    ${({ $status }) => {
        if ($status === 'success') {
            return css`
                background-color: var(--tg-theme-secondary-bg-color, #fff);
            `;
        }

        if ($status === 'error') {
            return css`
                background-color: rgba(241, 46, 46, 0.05);
            `;
        }

        return css``;
    }}
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(0.25)};
`;

const FileName = styled.div`
    flex-grow: 1;
    font-size: 14px;
    font-weight: 500;
`;

const StatusText = styled.div`
    font-size: 12px;
    color: #d32f2f;
`;

const IconWrapper = styled.div<{ $status?: UploadStatus }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 8px;
    background-color: ${({ $status }) =>
        $status === 'error'
            ? 'rgba(241, 46, 46, 0.05)'
            : $status === 'loading'
              ? 'rgba(67, 120, 255, 0.1)'
              : 'transparent'};
`;

const ImagePreview = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 8px;
    object-fit: cover;
`;

type UploadStatus = 'idle' | 'loading' | 'success' | 'error';

type FileUploadProps = {
    label?: string;
    defaultImage?: { url?: string | null; name?: string };
    onFileUpload?: (params: { url: string | null; name: string }) => void;
};

export const FileUploader: FunctionComponent<FileUploadProps> = ({ label = '', defaultImage, onFileUpload }) => {
    const { uploadFile } = useUploadFile();

    const [image, setImage] = useState<string | null | undefined>();
    const [fileName, setFileName] = useState<string | null>(null);
    const [status, setStatus] = useState<UploadStatus>('idle');
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (defaultImage?.url && defaultImage?.name) {
            setImage(defaultImage.url);
            setFileName(defaultImage.name);
            setStatus('success');
        }
    }, [defaultImage]);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setStatus('error');
            return;
        }

        setStatus('loading');

        // const reader = new FileReader();
        // reader.onloadend = () => {
        //     setPreview(reader.result as string);
        // };
        // reader.readAsDataURL(file);

        try {
            const uploaded = await uploadFile(file);

            await new Promise((res) => setTimeout(res, 500));

            setImage(uploaded.url); // реальный URL
            setFileName(uploaded.filename);
            setStatus('success');
            onFileUpload?.({ url: uploaded.url, name: uploaded.filename });
        } catch (e) {
            console.error(e);
            setStatus('error');
        }
    };

    const handleReset = () => {
        setImage(null);
        setFileName(null);
        setStatus('idle');
        onFileUpload?.({ url: '', name: '' });
    };

    return (
        <>
            {status === 'idle' && (
                <Container onClick={() => document.getElementById('file-input')?.click()}>
                    <Paperclip size={24} /> {label}
                    <input id="file-input" type="file" hidden accept="image/*" onChange={handleFileChange} />
                </Container>
            )}
            {status === 'loading' && fileName && (
                <FileItem>
                    <IconWrapper $status="loading">
                        <Loader2 size={24} className="animate-spin" />
                    </IconWrapper>
                    <FileName>{fileName}</FileName>
                </FileItem>
            )}
            {status === 'success' && image && fileName && (
                <FileItem $status="success">
                    <ImagePreview src={image || ''} alt="Uploaded" />
                    <Content>
                        <FileName>{fileName}</FileName>
                        <Text size="b3" color="secondary">
                            фото
                        </Text>
                    </Content>
                    <IconWrapper onClick={handleReset} style={{ marginLeft: 'auto' }}>
                        <X size={24} color="#666" />
                    </IconWrapper>
                </FileItem>
            )}
            {status === 'error' && (
                <FileItem $status="error">
                    <IconWrapper $status="error">
                        <RotateCcw size={24} color="#d32f2f" />
                    </IconWrapper>
                    <Content>
                        <FileName>{fileName}</FileName>
                        <StatusText>Ошибка</StatusText>
                    </Content>
                    <IconWrapper onClick={handleReset} style={{ marginLeft: 'auto' }}>
                        <X size={24} color="#666" />
                    </IconWrapper>
                </FileItem>
            )}
        </>
    );
};
