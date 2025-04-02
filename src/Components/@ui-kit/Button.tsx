import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes, FunctionComponent } from 'react';
import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`;

const pressEffect = keyframes`
    0% { transform: scale(1); box-shadow: 0px 0px 0px rgba(255, 50, 50, 0); }
    50% { transform: scale(1.05); box-shadow: 0px 0px 12px rgba(255, 50, 50, 0.4); }
    100% { transform: scale(1); box-shadow: 0px 0px 0px rgba(255, 50, 50, 0); }
`;

const buttonColors = {
    general: { bg: '#ba1924', hover: '#e63946', border: '#ba1924', text: '#fff' },
    secondary: { bg: '#555', hover: '#777', border: '#555', text: '#fff' },
    success: { bg: '#28a745', hover: '#218838', border: '#28a745', text: '#fff' },
    danger: { bg: '#dc3545', hover: '#c82333', border: '#dc3545', text: '#fff' },
};

const buttonVariants = {
    filled: (color: typeof buttonColors.general) => css`
        background: ${color.bg};
        color: ${color.text};
        border: none;

        &:hover {
            background: ${color.hover};
        }
    `,
    outlined: (color: typeof buttonColors.general) => css`
        background: transparent;
        color: ${color.bg};
        border: 2px solid ${color.border};

        &:hover {
            background: ${color.bg};
            color: white;
        }
    `,
    text: (color: typeof buttonColors.general) => css`
        background: transparent;
        color: ${color.bg};
        border: none;

        &:hover {
            color: ${color.hover};
            text-decoration: underline;
        }
    `,
};

const StyledButton = styled.button<{
    $color: keyof typeof buttonColors;
    $variant: keyof typeof buttonVariants;
    $loading?: boolean;
}>`
    padding: 10px 36px;
    font-size: 15px;
    font-weight: 600;
    border-radius: 22px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 50px;
    position: relative;
    overflow: hidden;
    transition: all 0.2s ease;

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

    ${({ $color }) => buttonVariants.filled(buttonColors[$color])}

    ${({ $color, $variant }) => buttonVariants[$variant](buttonColors[$color])}
`;

type Props = {
    loading?: boolean;
    color?: keyof typeof buttonColors;
    variant?: keyof typeof buttonVariants;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FunctionComponent<Props> = ({
    children,
    loading,
    disabled,
    color = 'general',
    variant = 'filled',
    ...props
}) => {
    return (
        <StyledButton disabled={disabled || loading} $loading={loading} $color={color} $variant={variant} {...props}>
            {loading ? <Loader2 size={18} style={{ animation: `${spin} 1s linear infinite` }} /> : children}
        </StyledButton>
    );
};
