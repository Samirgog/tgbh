import { FunctionComponent, HTMLAttributes } from 'react';
import styled from 'styled-components';

const ListItemIcon = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;

    svg {
        color: var(--tg-theme-accent-text-color, #3390ec);
    }
`;

export const Icon: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({ children, ...attrs }) => {
    return <ListItemIcon {...attrs}>{children}</ListItemIcon>;
};
