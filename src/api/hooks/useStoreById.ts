import { TStoreResponseDto, useFindWithDetailsQuery } from '@/api/generated';
import { gqlClient } from '@/api/providers/GraphqlClient';

export function useStoreById(storeId: string) {
    return useFindWithDetailsQuery<{ storeWithDetails?: TStoreResponseDto }>(gqlClient, { id: storeId });
}
