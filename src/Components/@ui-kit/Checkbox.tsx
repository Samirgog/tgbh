import { FunctionComponent } from 'react';
import styled from 'styled-components';

import { Text } from '@/Components/@ui-kit/Typography';

const CheckboxContainer = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: ${({ theme }) => theme.spacing(1)};
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    display: none;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
    width: 24px;
    height: 24px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid ${({ theme, checked }) => (checked ? theme.colors.primary : theme.colors.border)};
    background: ${({ theme, checked }) => (checked ? theme.colors.primary : 'transparent')};
    transition: all 0.2s ease-in-out;

    svg {
        opacity: ${({ checked }) => (checked ? 1 : 0)};
        transition: opacity 0.2s ease-in-out;
    }
`;

type Props = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
};

export const Checkbox: FunctionComponent<Props> = ({ checked, onChange, label }) => {
    return (
        <CheckboxContainer>
            <HiddenCheckbox checked={checked} onChange={() => onChange(!checked)} />
            <StyledCheckbox checked={checked}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5 12L10 17L20 7"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </StyledCheckbox>
            {label && <Text size="b2">{label}</Text>}
        </CheckboxContainer>
    );
};
