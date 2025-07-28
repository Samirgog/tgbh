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
    border: 1.8px solid var(--tg-theme-secondary-bg-color, #e2e2e2);
    background: var(--tg-theme-section-bg-color, #f4f4f5);
    color: var(--tg-theme-text-color, #333);

    &::placeholder {
        color: var(--tg-theme-subtitle-text-color, #707579);
    }

    &:focus {
        border-color: var(--tg-theme-button-color, #007aff);
        outline: none;
    }

    ${({ $invalid }) =>
        $invalid &&
        css`
            border-color: var(--tg-theme-destructive-text-color, #df3f40);
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
