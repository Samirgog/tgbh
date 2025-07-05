import { useCreateStoreMutation } from '@/api/generated';
import { gqlClient } from '@/api/providers/GraphqlClient';

export function useCreateStore() {
    const { mutateAsync: createStore, isPending } = useCreateStoreMutation(gqlClient);

    return { createStore, isPending };
}
