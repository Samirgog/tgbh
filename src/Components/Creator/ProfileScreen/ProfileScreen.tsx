import { Edit } from 'lucide-react';
import { FunctionComponent } from 'react';
import styled from 'styled-components';

import { DrawerProfileSettings } from '@/Components/Creator/ProfileScreen/DrawerProfileSettings';
import { useControlProfile } from '@/Components/Creator/ProfileScreen/useControlProfile';
import { PersonalInfo } from '@/Models/User';
import { useBusinessEditorStore } from '@/Store/BusinessEditor';

const ProfileWrapper = styled.div`
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${({ theme }) => theme.colors.background || '#f5f5f5'};
    height: 100%;
`;

const Avatar = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #ddd;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const NameBlock = styled.div`
    text-align: center;
    margin-bottom: 16px;
`;

const FullName = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: #1c1c1c;
`;

const Email = styled.div`
    font-size: 14px;
    color: #888;
`;

const EditButton = styled.button`
    margin-top: 24px;
    background: #0088cc;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    &:active {
        background: #0077b3;
    }
`;

export const ProfileScreen: FunctionComponent = () => {
    const { personalInfo: user } = useBusinessEditorStore();
    const { isOpenDrawer, openProfileDrawer, closeProfileDrawer } = useControlProfile();

    const fullName = [user.lastName, user.firstName, user.middleName].filter(Boolean).join(' ');

    const handleEdit = () => {
        openProfileDrawer();
    };

    const handleSave = (nextUser?: Partial<PersonalInfo>) => {
        console.log({ nextUser });
        closeProfileDrawer();
    };

    return (
        <>
            <DrawerProfileSettings open={isOpenDrawer} onClose={closeProfileDrawer} onSave={handleSave} user={user} />
            <ProfileWrapper>
                <Avatar>{user.avatar ? <img src={user.avatar} alt="" /> : <Edit size={32} color="#888" />}</Avatar>

                <NameBlock>
                    <FullName>{fullName}</FullName>
                    <Email>{user.email}</Email>
                </NameBlock>

                <EditButton onClick={handleEdit}>
                    <Edit size={18} />
                    Редактировать
                </EditButton>
            </ProfileWrapper>
        </>
    );
};
