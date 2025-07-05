import { GraphQLClient } from 'graphql-request';

export const gqlClient = new GraphQLClient(import.meta.env.VITE_PUBLIC_API_URL, {
    headers: () => ({
        'Apollo-Require-Preflight': 'true',
    }),
});
