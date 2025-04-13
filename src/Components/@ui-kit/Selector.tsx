import { FunctionComponent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: relative;
    display: flex;
    background: #f3eae7;
    border-radius: 999px;
    padding: 4px;
    justify-content: space-between;
    width: fit-content;
`;

const Slider = styled.div<{ left: number; width: number }>`
    position: absolute;
    top: 4px;
    left: ${({ left }) => `${left}px`};
    width: ${({ width }) => `${width}px`};
    height: calc(100% - 8px);
    background: #ba1924;
    border-radius: 999px;
    transition: all 0.3s ease;
    z-index: 0;
`;

const Option = styled.button<{ active: boolean }>`
    position: relative;
    z-index: 1;
    padding: 8px 16px;
    background: transparent;
    color: ${({ active }) => (active ? '#fff' : '#000')};
    border-radius: 999px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.3s;
`;

type Props = {
    options: (string | number)[];
    selected: string | number;
    onSelect: (option: string | number) => void;
};

export const Selector: FunctionComponent<Props> = ({ options, selected, onSelect }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [sliderPosition, setSliderPosition] = useState({ left: 0, width: 0 });

    useEffect(() => {
        const index = options.findIndex((o) => o === selected);
        if (containerRef.current) {
            const children = containerRef.current.children;
            const selectedBtn = children[index + 1] as HTMLButtonElement; // +1 из-за slider
            if (selectedBtn) {
                const { offsetLeft, offsetWidth } = selectedBtn;
                setSliderPosition({ left: offsetLeft, width: offsetWidth });
            }
        }
    }, [selected, options]);

    return (
        <Wrapper ref={containerRef}>
            <Slider left={sliderPosition.left} width={sliderPosition.width} />
            {options.map((option) => (
                <Option key={option} active={option === selected} onClick={() => onSelect(option)}>
                    {option}
                </Option>
            ))}
        </Wrapper>
    );
};
