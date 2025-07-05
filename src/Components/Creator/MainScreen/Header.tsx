import { User } from 'lucide-react';
import { FunctionComponent } from 'react';
import styled from 'styled-components';

import { Title } from '@/Components/@ui-kit';

const HeaderWrapper = styled.header`
    display: flex;
    align-items: center;
    gap: 12px;
    background-color: #fff;
`;

const AvatarWrapper = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const AvatarImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

type Props = {
    avatarUrl?: string;
    name?: string;
    onClick?: () => void;
};

export const Header: FunctionComponent<Props> = ({ avatarUrl, name, onClick }) => {
    return (
        <HeaderWrapper onClick={onClick}>
            <AvatarWrapper>
                {avatarUrl ? <AvatarImage src={avatarUrl} alt="avatar" /> : <User size={20} color="#555" />}
            </AvatarWrapper>
            <Title size="h4">{name}</Title>
        </HeaderWrapper>
    );
};
