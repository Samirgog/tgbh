import { useMutation } from '@tanstack/react-query';

async function uploadFile(file: File): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) throw new Error('Failed to upload file');

    return response.json();
}

export function useUploadFile() {
    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: uploadFile,
    });

    return {
        uploadFile: mutateAsync,
        isUploading: isPending,
        error,
    };
}
