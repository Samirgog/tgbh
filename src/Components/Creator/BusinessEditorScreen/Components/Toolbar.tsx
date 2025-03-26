import { Eye, Palette, Save, Settings, X } from 'lucide-react';
import { FunctionComponent, useState } from 'react';
import styled, { keyframes } from 'styled-components';

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
    top: 16px;
    ${({ $position }) => ($position === 'left' ? 'left: 16px;' : 'right: 16px;')}
    z-index: 10;
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
    font-size: 14px;
    font-weight: 500;
    color: #333;
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
    const [isOpen, setIsOpen] = useState(false);

    return (
        <PanelContainer $isOpen={isOpen} $position={position}>
            <Panel $isOpen={isOpen} $position={position}>
                <IconButton onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
                    {isOpen ? <X size={24} /> : <Settings size={24} />}
                </IconButton>

                {isOpen && (
                    <FadeInDiv $isVisible={isOpen}>
                        <ToolButton onClick={onSelectTheme}>
                            <Palette size={20} color="#B91E23" />
                            Настройка темы
                        </ToolButton>
                        <ToolButton onClick={onSelectPreview}>
                            <Eye size={20} color="#B91E23" />
                            Просмотр превью
                        </ToolButton>
                        <ToolButton onClick={onSelectSave}>
                            <Save size={20} color="#B91E23" />
                            Сохранить
                        </ToolButton>
                    </FadeInDiv>
                )}
            </Panel>
        </PanelContainer>
    );
};
