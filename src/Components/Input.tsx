import styled from 'styled-components';
import { Text } from '@/Components/Typography';
import { FunctionComponent, HTMLAttributes, InputHTMLAttributes } from 'react';

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(0.5)};
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.inputBackground};
    color: ${({ theme }) => theme.colors.textSecondary};

    &::placeholder {
        color: ${({ theme }) => theme.colors.placeholder};
    }

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        outline: none;
    }
`;

type Props = {
    label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input: FunctionComponent<Props> = ({ label, ...attrs }) => {
    return (
        <InputContainer>
            {label && (
                <Text size="b2" weight="semibold">
                    {label}
                </Text>
            )}
            <StyledInput {...attrs} />
        </InputContainer>
    );
};
