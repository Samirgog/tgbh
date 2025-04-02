import { Eye, Palette, Save, Settings, X } from 'lucide-react';
import { FunctionComponent, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { Text } from '@/Components/@ui-kit/Typography';

const fadeIn = keyframes`
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
`;

const fadeOut = keyframes`
    from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(0.8); }
`;

const PanelContainer = styled.div<{ $isOpen: boolean; $position: 'left' | 'right' }>`
    position: fixed;
    top: 8px;
    ${({ $position }) => ($position === 'left' ? 'left: 16px;' : 'right: 16px;')}
    z-index: 100;
`;

const Panel = styled.div<{ $isOpen: boolean; $position: 'left' | 'right' }>`
    position: absolute;
    top: 0;
    ${({ $position }) => ($position === 'left' ? 'left: 0;' : 'right: 0;')}
    width: ${({ $isOpen }) => ($isOpen ? 'min(90vw, 320px)' : '48px')};
    height: ${({ $isOpen }) => ($isOpen ? 'auto' : '48px')};
    padding: ${({ $isOpen }) => ($isOpen ? '16px' : '0')};
    background: #fff;
    border-radius: 16px;
    border: 2px solid #ddd;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition:
        width 0.3s ease-in-out,
        height 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: ${({ $isOpen }) => ($isOpen ? 'stretch' : 'center')};
    justify-content: center;
    gap: 12px;
`;

const IconButton = styled.button<{ $isOpen: boolean }>`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: transform 0.2s ease;
    &:hover {
        transform: scale(1.1);
    }
`;

const ToolButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    width: 100%;
    background: #fff;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 4px;
    border: none;

    &:not(:last-child) {
        border-bottom: 1px solid #ddd;
    }
`;

const FadeInDiv = styled.div<{ $isVisible: boolean }>`
    animation: ${({ $isVisible }) => ($isVisible ? fadeIn : fadeOut)} 0.3s ease forwards;
`;

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    z-index: 99;
`;

type Props = {
    position?: 'left' | 'right';
    onSelectTheme?: () => void;
    onSelectPreview?: () => void;
    onSelectSave?: () => void;
};

export const Toolbar: FunctionComponent<Props> = ({
    position = 'left',
    onSelectTheme,
    onSelectSave,
    onSelectPreview,
}) => {
    const [isOpen, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((prev) => !prev);
    };

    return (
        <>
            {isOpen && <Backdrop onClick={toggleOpen} />}
            <PanelContainer $isOpen={isOpen} $position={position}>
                <Panel $isOpen={isOpen} $position={position}>
                    <IconButton onClick={toggleOpen} $isOpen={isOpen}>
                        {isOpen ? <X size={24} /> : <Settings size={24} />}
                    </IconButton>

                    {isOpen && (
                        <FadeInDiv $isVisible={isOpen}>
                            <ToolButton onClick={onSelectTheme}>
                                <Palette size={20} color="#B91E23" />
                                <Text size="b1" weight="medium">
                                    Настройка темы
                                </Text>
                            </ToolButton>
                            <ToolButton onClick={onSelectPreview}>
                                <Eye size={20} color="#B91E23" />
                                <Text size="b1" weight="medium">
                                    Просмотр превью
                                </Text>
                            </ToolButton>
                            <ToolButton onClick={onSelectSave}>
                                <Save size={20} color="green" />
                                <Text size="b1" weight="medium">
                                    Сохранить в черновики
                                </Text>
                            </ToolButton>
                        </FadeInDiv>
                    )}
                </Panel>
            </PanelContainer>
        </>
    );
};
