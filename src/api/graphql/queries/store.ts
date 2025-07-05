import { gql } from 'graphql-request';

gql`
    mutation CreateStore($ownerId: ID!, $data: CreateStoreInput!) {
        createStore(ownerId: $ownerId, data: $data) {
            id
            name
            status
        }
    }
`;

gql`
    query FindByOwnerId($ownerId: ID!) {
        storesByOwner(ownerId: $ownerId) {
            id
            name
            description
            bannerUrl
            bannerName
            status
            categories {
                name
                priority
                products {
                    name
                    priceAmount
                    description
                }
            }
        }
    }
`;

gql`
    query FindWithDetails($id: ID!) {
        storeWithDetails(id: $id) {
            id
            name
            description
            status
            bannerUrl
            bannerName
            categories {
                id
                name
                priority
                imageUrl
                imageName
                products {
                    name
                    parameters {
                        id
                        priceAmount
                        text
                    }
                    priceAmount
                    priceCurrency
                    description
                    imageUrl
                    imageName
                    isActive
                }
            }
            paymentMethods {
                type
            }
            paymentConditions {
                condition
            }
            deliveryMethods {
                receiveWay
                details
            }
        }
    }
`;
