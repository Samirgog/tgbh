import React, {
    forwardRef,
    ForwardRefExoticComponent,
    HTMLAttributes,
    PropsWithChildren,
    PropsWithoutRef,
    RefAttributes,
} from 'react';
import styled from 'styled-components';

import { Item } from '@/Components/@ui-kit/List/Sections';

export const Container = styled.div`
    background: white;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
`;

const ListWrapper = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;

    li {
        &:not(:last-child) {
            border-bottom: 1px solid #ddd;
        }
    }
`;

type ListProps = HTMLAttributes<HTMLUListElement>;

type ListComponent = {
    Item: typeof Item;
} & ForwardRefExoticComponent<PropsWithoutRef<PropsWithChildren<ListProps>> & RefAttributes<HTMLUListElement>>;

const ForwardedList = forwardRef<HTMLUListElement, ListProps>(({ children, ...attrs }, ref) => {
    return (
        <ListWrapper ref={ref} {...attrs}>
            {children}
        </ListWrapper>
    );
});

ForwardedList.displayName = 'List';

export const List: ListComponent = Object.assign(ForwardedList, { Item });
