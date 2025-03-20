import styled, { css } from 'styled-components';
import { Text } from '@/Components/Typography';
import { FunctionComponent, InputHTMLAttributes } from 'react';

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(0.5)};
`;

const StyledInput = styled.input<{ $invalid: boolean }>`
    width: 100%;
    min-width: 34px;
    padding: 13px 16px;
    font-size: 14px;
    border-radius: 12px;
    border: 1.8px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.input.background};
    color: ${({ theme }) => theme.colors.textSecondary};

    &::placeholder {
        color: ${({ theme }) => theme.colors.placeholder};
    }

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        outline: none;
    }

    ${({ $invalid }) =>
        $invalid &&
        css`
            border-color: ${({ theme }) => theme.colors.error};
        `}
`;

type Props = {
    label?: string;
    invalid?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input: FunctionComponent<Props> = ({ label, invalid = false, ...attrs }) => {
    return (
        <InputContainer>
            {label && <Text size="b1">{label}</Text>}
            <StyledInput $invalid={invalid} {...attrs} />
        </InputContainer>
    );
};
