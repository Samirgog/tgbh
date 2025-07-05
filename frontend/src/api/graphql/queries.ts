import { gql } from '@apollo/client';

export const GET_MY_STORES = gql`
  query GetMyStores {
    myStores {
      id
      name
      description
      status
      theme {
        background
        accent
        cardBackground
      }
      paymentMethods {
        type
        condition
        isEnabled
      }
      deliveryMethods {
        receiveWay
        details
        isEnabled
      }
    }
  }
`;

export const GET_STORE_DETAILS = gql`
  query GetStoreDetails($id: ID!) {
    storeWithDetails(id: $id) {
      id
      name
      description
      status
      theme {
        background
        accent
        cardBackground
      }
      categories {
        id
        name
        products {
          id
          name
          price
        }
      }
      paymentMethods {
        type
        condition
        isEnabled
      }
      deliveryMethods {
        receiveWay
        details
        isEnabled
      }
    }
  }
`; 