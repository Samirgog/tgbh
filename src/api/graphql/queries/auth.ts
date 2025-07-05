import { gql } from 'graphql-request';

gql`
    mutation Auth($input: AuthInput!) {
        auth(input: $input) {
            id
            telegramId
            firstName
            lastName
            username
        }
    }
`;
