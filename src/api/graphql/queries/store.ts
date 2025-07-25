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
                    id
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

gql`
    mutation UpdateStore($id: ID!, $data: UpdateStoreInput!) {
        updateStore(id: $id, data: $data) {
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
                    id
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
