import { FunctionComponent, HTMLAttributes } from 'react';
import styled from 'styled-components';

import { Content, Icon } from './Sections';

const ListItemWrapper = styled.li`
    display: flex;
    align-items: center;
    padding: 12px;
    cursor: pointer;
    transition: background 0.2s;
`;

type ItemComponent = {
    Icon: typeof Icon;
    Content: typeof Content;
} & FunctionComponent<HTMLAttributes<HTMLLIElement>>;

export const Item: ItemComponent = ({ children, ...attrs }) => {
    return <ListItemWrapper {...attrs}>{children}</ListItemWrapper>;
};

Item.Icon = Icon;
Item.Content = Content;
