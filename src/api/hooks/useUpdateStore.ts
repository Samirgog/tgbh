import { useUpdateStoreMutation } from '@/api/generated';
import { gqlClient } from '@/api/providers/GraphqlClient';

export function useUpdateStore() {
    const { mutateAsync: updateStore, isPending } = useUpdateStoreMutation(gqlClient);

    return { updateStore, isPending };
}
