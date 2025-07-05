import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useAuthMutation } from '@/api/generated';
import { gqlClient } from '@/api/providers/GraphqlClient';
import { User } from '@/Models/User';
import { useBusinessEditorStore } from '@/Store/BusinessEditor';

export function useAuth() {
    const { setUser } = useBusinessEditorStore(useShallow(({ setUser }) => ({ setUser })));
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { mutateAsync: authUser, isPending } = useAuthMutation(gqlClient, {
        onSuccess: (data) => {
            if (data.auth) {
                setUser(data.auth as User);
                setIsAuthenticated(true);
            }
        },
    });

    useEffect(() => {
        const authenticate = async () => {
            const { initData = '' } = window.Telegram.WebApp || {};

            await authUser({
                input: {
                    initData,
                },
            });
        };

        authenticate();
    }, [authUser]);

    return { isPending, isAuthenticated };
}
