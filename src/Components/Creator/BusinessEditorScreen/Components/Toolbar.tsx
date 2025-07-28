import { Eye, Palette, Save, Settings } from 'lucide-react';
import { useState } from 'react';
import styled, { css } from 'styled-components';

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface ToolbarProps {
    position?: Position;
    fixed?: boolean;
    onSelectTheme?: () => void;
    onSelectPreview?: () => void;
    onSelectSave?: () => void;
}

const Wrapper = styled.div<{ $position: Position; $fixed: boolean }>`
    position: ${({ $fixed }) => ($fixed ? 'fixed' : 'absolute')};
    z-index: 100;
    display: flex;
    align-items: center;
    ${({ $position }) => ($position.includes('bottom') ? 'bottom: 16px;' : 'top: 16px;')}
    ${({ $position }) => ($position.includes('right') ? 'right: 16px; flex-direction: row-reverse;' : 'left: 16px;')}
`;

const Container = styled.div<{ $isOpen: boolean; $fromRight: boolean }>`
    display: flex;
    align-items: center;
    height: 48px;
    background: var(--tg-theme-bg-color);
    border-radius: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    transition: width 0.3s ease;
    width: ${({ $isOpen }) => ($isOpen ? '168px' : '48px')};
    flex-direction: ${({ $fromRight }) => ($fromRight ? 'row-reverse' : 'row')};
`;

const Button = styled.button`
    width: 48px;
    height: 48px;
    min-width: 48px;
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const IconButton = styled(Button)`
    margin: 0 4px;
    border-radius: 12px;
    transition: background 0.2s;
`;

export const Toolbar = ({
    position = 'top-left',
    fixed = true,
    onSelectTheme,
    onSelectPreview,
    onSelectSave,
}: ToolbarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const fromRight = position.includes('right');

    return (
        <Wrapper $position={position} $fixed={fixed}>
            <Container $isOpen={isOpen} $fromRight={fromRight}>
                <Button onClick={() => setIsOpen((prev) => !prev)}>
                    <Settings size={22} style={{ color: 'var(--tg-theme-text-color)' }} />
                </Button>
                {isOpen && (
                    <>
                        {/*<IconButton onClick={onSelectTheme}>*/}
                        {/*    <Palette size={20} color="#B91E23" />*/}
                        {/*</IconButton>*/}
                        <IconButton onClick={onSelectPreview}>
                            <Eye size={20} color="#B91E23" />
                        </IconButton>
                        <IconButton onClick={onSelectSave}>
                            <Save size={20} color="green" />
                        </IconButton>
                    </>
                )}
            </Container>
        </Wrapper>
    );
};
