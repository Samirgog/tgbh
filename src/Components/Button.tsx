import { ButtonHTMLAttributes, FunctionComponent } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Loader2 } from 'lucide-react';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const StyledButton = styled.button<{ $loading?: boolean }>`
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing(1)}px;
    transition:
        background-color 0.2s ease,
        opacity 0.2s ease;
    min-width: 100px;

    ${({ disabled, $loading }) =>
        disabled || $loading
            ? css`
                  background-color: ${({ theme }) => theme.colors.button.disabled};
                  cursor: not-allowed;
              `
            : css`
                  background-color: ${({ theme }) => theme.colors.button.primary};

                  &:hover {
                      background-color: ${({ theme }) => theme.colors.button.hover};
                  }

                  &:active {
                      background-color: ${({ theme }) => theme.colors.button.active};
                  }
              `}
`;

type Props = {
    loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FunctionComponent<Props> = ({ children, loading, disabled, ...props }) => {
    return (
        <StyledButton disabled={disabled || loading} $loading={loading} {...props}>
            {loading ? <Loader2 size={16} style={{ animation: `${spin} 1s linear infinite` }} /> : children}
        </StyledButton>
    );
};
