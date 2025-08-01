import { Check } from 'lucide-react';
import React, { Fragment, FunctionComponent, useState } from 'react';
import styled, { css } from 'styled-components';

import { Text } from '@/Components/@ui-kit/Typography';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background: var(--tg-theme-bg-color, #fff);
    border-radius: 12px;
    overflow: hidden;

    ${({ theme }) => {
        if (theme.mode === 'dark') {
            return css`
                border: 1px solid var(--tg-theme-hint-color, #fff);
            `;
        }

        return css`
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
        `;
    }}
`;

const Option = styled.div<{ $selected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    cursor: pointer;
    background: ${({ $selected }) => ($selected ? 'var(--tg-theme-secondary-bg-color)' : 'transparent')};
    transition: background 0.2s ease-in-out;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    ${({ theme }) => {
        if (theme.mode === 'dark') {
            return css`
                background-color: var(--tg-theme-hint-color, #fff);
            `;
        }

        return css`
            background-color: rgba(0, 0, 0, 0.15);
        `;
    }}
`;

type Option = { label: string; value: string };

type Props = {
    options: Option[];
    values: Option[];
    onSelect?: (options: string[]) => void;
};

export const MultiSelect: FunctionComponent<Props> = ({ options, values, onSelect }) => {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>(values);

    const toggleOption = (option: Option) => {
        const nextOptions = selectedOptions.find((item) => item.value === option.value)
            ? selectedOptions.filter((item) => item.value !== option.value)
            : [...selectedOptions, option];
        setSelectedOptions(nextOptions);
        onSelect?.(nextOptions.map((nextOption) => nextOption.value));
    };

    return (
        <Container>
            {options.map((option, index) => (
                <Fragment key={option.value}>
                    <Option
                        $selected={Boolean(selectedOptions.find((item) => item.value === option.value))}
                        onClick={() => toggleOption(option)}
                    >
                        <Text size="b1">{option.label}</Text>
                        {selectedOptions.includes(option) && <Check size={20} color="#007aff" />}
                    </Option>
                    {index < options.length - 1 && <Divider />}
                </Fragment>
            ))}
        </Container>
    );
};
