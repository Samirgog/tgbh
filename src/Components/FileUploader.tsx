import { Loader2, Paperclip, RotateCcw, X } from 'lucide-react';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(1)};
    cursor: pointer;
    color: #007aff;
    font-size: 16px;
    padding: 10px 18px;
`;

const FileItem = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(2)};
    padding: 8px;
    border-radius: 8px;
    width: 100%;
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
            : $status === 'uploading'
              ? 'rgba(67, 120, 255, 0.1)'
              : 'transparent'};
`;

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

type FileUploadProps = {
    label?: string;
    onFileUpload?: (file: File) => Promise<boolean>;
};

export const FileUploader: FunctionComponent<FileUploadProps> = ({ label = '', onFileUpload }) => {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<UploadStatus>('idle');

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setStatus('uploading');

        try {
            const success = await onFileUpload?.(selectedFile);
            setStatus(success ? 'success' : 'error');
        } catch {
            setStatus('error');
        }
    };

    const handleRetry = () => {
        if (file) {
            handleFileChange({ target: { files: [file] } } as unknown as ChangeEvent<HTMLInputElement>);
        }
    };

    return (
        <>
            {status === 'idle' && (
                <Container onClick={() => document.getElementById('file-input')?.click()}>
                    <Paperclip size={24} /> {label}
                    <input id="file-input" type="file" hidden onChange={handleFileChange} />
                </Container>
            )}
            {status === 'uploading' && file && (
                <FileItem>
                    <IconWrapper $status="uploading">
                        <Loader2 size={24} className="animate-spin" />
                    </IconWrapper>
                    <FileName>{file.name}</FileName>
                </FileItem>
            )}
            {status === 'error' && file && (
                <FileItem>
                    <IconWrapper $status="error" onClick={handleRetry} style={{ cursor: 'pointer' }}>
                        <RotateCcw size={24} color="#d32f2f" />
                    </IconWrapper>
                    <Content>
                        <FileName>{file.name}</FileName>
                        <StatusText>Ошибка</StatusText>
                    </Content>
                    <IconWrapper
                        onClick={() => {
                            setFile(null);
                            setStatus('idle');
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        <X size={24} color="#666" />
                    </IconWrapper>
                </FileItem>
            )}
        </>
    );
};
