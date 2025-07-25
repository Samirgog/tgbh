// noinspection CssUnresolvedCustomProperty

import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes, FunctionComponent } from 'react';
import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`;

const pressEffect = keyframes`
    0% { transform: scale(1); box-shadow: 0px 0px 0px rgba(255, 50, 50, 0); }
    50% { transform: scale(1.05); box-shadow: 0px 0px 12px var(--tg-theme-button-color); }
    100% { transform: scale(1); box-shadow: 0px 0px 0px rgba(255, 50, 50, 0); }
`;

const buttonVariants = {
    filled: () => css`
        background: var(--tg-theme-button-color, #007aff);
        color: var(--tg-theme-button-text-color, #fff);
        border: none;
    `,
    outlined: () => css`
        background: transparent;
        color: var(--tg-theme-button-color, #007aff);
        border: 2px solid var(--tg-theme-button-color, #007aff);
    `,
    text: () => css`
        background: transparent;
        color: var(--tg-theme-button-text-color, #fff);
        border: none;
    `,
};

const StyledButton = styled.button<{
    $variant: keyof typeof buttonVariants;
    $loading?: boolean;
}>`
    padding: 10px 36px;
    font-size: 15px;
    font-weight: 600;
    border-radius: 1.875rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 50px;
    position: relative;
    overflow: hidden;
    transition: all 0.2s ease;
    background-color: var(--tg-theme-button-color, #fff);
    color: var(--tg-theme-button-text-color, #fff);

    ${({ disabled, $loading }) =>
        disabled || $loading
            ? css`
                  opacity: 0.35;
                  cursor: not-allowed;
              `
            : css`
                  &:active {
                      animation: ${pressEffect} 0.3s ease-out;
                  }
              `}

    ${({ $variant }) => buttonVariants[$variant]()}
`;

type Props = {
    loading?: boolean;
    variant?: keyof typeof buttonVariants;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FunctionComponent<Props> = ({ children, loading, disabled, variant = 'filled', ...props }) => {
    return (
        <StyledButton disabled={disabled || loading} $loading={loading} $variant={variant} {...props}>
            {loading ? <Loader2 size={18} style={{ animation: `${spin} 1s linear infinite` }} /> : children}
        </StyledButton>
    );
};
