import { ButtonHTMLAttributes, FunctionComponent } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Loader2 } from 'lucide-react';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const StyledButton = styled.button<{ $loading?: boolean }>`
    padding: 8px 32px;
    font-size: 15px;
    font-weight: 600;
    line-height: 133%;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
        background-color 0.2s ease,
        opacity 0.2s ease;
    min-width: 50px;
    background-color: ${({ theme }) => theme.colors.button.primary};

    ${({ disabled, $loading }) =>
        disabled || $loading
            ? css`
                  opacity: 0.35;
                  cursor: not-allowed;
              `
            : css`
                  &:hover {
                      opacity: 0.85;
                  }

                  &:active {
                      opacity: 0.65;
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
