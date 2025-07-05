import { useFindByOwnerIdQuery } from '@/api/generated';
import { gqlClient } from '@/api/providers/GraphqlClient';
import { Store } from '@/Models/User';

export function useStores(ownerId: string) {
    return useFindByOwnerIdQuery<{ storesByOwner: Store[] }>(gqlClient, { ownerId });
}
