import { gql } from '@apollo/client';

export const LOGIN_WITH_TELEGRAM = gql`
  mutation LoginWithTelegram($initData: String!) {
    loginWithTelegram(loginInput: { initData: $initData }) {
      accessToken
      user {
        id
        telegramId
        username
        firstName
        lastName
        avatarUrl
        role
      }
    }
  }
`;

export const CREATE_STORE = gql`
  mutation CreateStore($input: CreateStoreInput!) {
    createStore(input: $input) {
      id
      name
      description
      status
    }
  }
`;

export const UPDATE_STORE = gql`
  mutation UpdateStore($input: UpdateStoreInput!) {
    updateStore(input: $input) {
      id
      name
      description
      status
    }
  }
`;

export const UPDATE_STORE_PAYMENT_METHODS = gql`
  mutation UpdateStorePaymentMethods($input: UpdateStorePaymentMethodsInput!) {
    updateStorePaymentMethods(input: $input) {
      id
      paymentMethods {
        type
        condition
        isEnabled
      }
    }
  }
`;

export const UPDATE_STORE_DELIVERY_METHODS = gql`
  mutation UpdateStoreDeliveryMethods($input: UpdateStoreDeliveryMethodsInput!) {
    updateStoreDeliveryMethods(input: $input) {
      id
      deliveryMethods {
        receiveWay
        details
        isEnabled
      }
    }
  }
`; 