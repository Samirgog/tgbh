import { forwardRef, InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

import { Text } from '@/Components/@ui-kit/Typography';

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

export const Input = forwardRef<HTMLInputElement, Props>(({ label, invalid = false, ...attrs }, ref) => {
    return (
        <InputContainer>
            {label && (
                <Text size="b1" weight="medium">
                    {label}
                </Text>
            )}
            <StyledInput ref={ref} $invalid={invalid} {...attrs} />
        </InputContainer>
    );
});

Input.displayName = 'Input';
