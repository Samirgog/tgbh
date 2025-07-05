import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
  DateTime: { input: any; output: any; }
};

export type TAuthInput = {
  /** Данные инициализации от Телеграма */
  initData: Scalars['String']['input'];
};

export type TCategory = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  imageName?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  priority: Scalars['Float']['output'];
  products?: Maybe<Array<TProduct>>;
  store: TStore;
  updatedAt: Scalars['DateTime']['output'];
};

export type TCategoryInput = {
  imageName: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
  priority?: InputMaybe<Scalars['Float']['input']>;
  products?: InputMaybe<Array<TProductInput>>;
};

export type TCategoryResponseDto = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  imageName?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  priority: Scalars['Float']['output'];
  products?: Maybe<Array<TProductResponseDto>>;
  storeId: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TCreateCategoryInput = {
  imageName?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  priority?: InputMaybe<Scalars['Int']['input']>;
  storeId: Scalars['String']['input'];
};

export type TCreateParameterInput = {
  priceAmount?: InputMaybe<Scalars['Float']['input']>;
  text: Scalars['String']['input'];
};

export type TCreateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  imageName?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isActive?: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  parameters?: InputMaybe<Array<InputMaybe<TCreateParameterInput>>>;
  priceAmount?: InputMaybe<Scalars['Float']['input']>;
  priceCurrency?: InputMaybe<Scalars['String']['input']>;
};

export type TCreateStoreInput = {
  bannerName?: InputMaybe<Scalars['String']['input']>;
  bannerUrl?: InputMaybe<Scalars['String']['input']>;
  categories: Array<TCategoryInput>;
  deliveryMethods?: InputMaybe<Array<TStoreDeliveryMethodInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  paymentConditions?: InputMaybe<Array<TStorePaymentConditionInput>>;
  paymentMethods?: InputMaybe<Array<TStorePaymentMethodInput>>;
  theme?: InputMaybe<Scalars['String']['input']>;
};

export type TCreateUserDto = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isBot?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  telegramAuthDate?: InputMaybe<Scalars['Int']['input']>;
  telegramHash?: InputMaybe<Scalars['String']['input']>;
  telegramId: Scalars['Int']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type TMutation = {
  approveStore: TStoreResponseDto;
  archiveStore: TStoreResponseDto;
  auth: TUser;
  createCategory: TCategory;
  createProduct: TProduct;
  createStore: TStoreResponseDto;
  createUser: TUser;
  deleteStore: TStoreResponseDto;
  publishStore: TStoreResponseDto;
  rejectStore: TStoreResponseDto;
  removeUser: TUser;
  updateStore: TStoreResponseDto;
};


export type TMutationApproveStoreArgs = {
  id: Scalars['ID']['input'];
};


export type TMutationArchiveStoreArgs = {
  id: Scalars['ID']['input'];
};


export type TMutationAuthArgs = {
  input: TAuthInput;
};


export type TMutationCreateCategoryArgs = {
  data: TCreateCategoryInput;
};


export type TMutationCreateProductArgs = {
  categoryId: Scalars['ID']['input'];
  data: TCreateProductInput;
};


export type TMutationCreateStoreArgs = {
  data: TCreateStoreInput;
  ownerId: Scalars['ID']['input'];
};


export type TMutationCreateUserArgs = {
  createUserDto: TCreateUserDto;
};


export type TMutationDeleteStoreArgs = {
  id: Scalars['ID']['input'];
};


export type TMutationPublishStoreArgs = {
  id: Scalars['ID']['input'];
};


export type TMutationRejectStoreArgs = {
  id: Scalars['ID']['input'];
};


export type TMutationRemoveUserArgs = {
  id: Scalars['ID']['input'];
};


export type TMutationUpdateStoreArgs = {
  data: TUpdateStoreInput;
  id: Scalars['ID']['input'];
};

export type TOrder = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  items: Array<TOrderItem>;
  notes?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  statusHistory: Array<TOrderStatusHistory>;
  store: TStore;
  totalAmount: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: TUser;
};

export type TOrderItem = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  price: Scalars['Float']['output'];
  product: TProduct;
  quantity: Scalars['Float']['output'];
  totalPrice: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TOrderItemParameterResponseDto = {
  priceAmount?: Maybe<Scalars['Float']['output']>;
  text: Scalars['String']['output'];
};

export type TOrderItemResponseDto = {
  id: Scalars['ID']['output'];
  productDescription?: Maybe<Scalars['String']['output']>;
  productId: Scalars['ID']['output'];
  productImageUrl?: Maybe<Scalars['String']['output']>;
  productName: Scalars['String']['output'];
  productSnapshotId?: Maybe<Scalars['ID']['output']>;
  quantity: Scalars['Float']['output'];
  selectedParameters?: Maybe<Array<TOrderItemParameterResponseDto>>;
  totalPrice: Scalars['Float']['output'];
  unitPrice: Scalars['Float']['output'];
};

export type TOrderResponseDto = {
  chosenPaymentCondition: TPaymentCondition;
  chosenPaymentType: TPaymentType;
  chosenReceiveWay: TReceiveWay;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency: Scalars['String']['output'];
  customerId: Scalars['ID']['output'];
  customerName?: Maybe<Scalars['String']['output']>;
  customerPhoneNumber?: Maybe<Scalars['String']['output']>;
  deliveryAddress?: Maybe<Scalars['String']['output']>;
  deliveryLat?: Maybe<Scalars['Float']['output']>;
  deliveryLon?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  items: Array<TOrderItemResponseDto>;
  shortId: Scalars['String']['output'];
  status: TOrderStatus;
  statusHistory: Array<TOrderStatusHistoryResponseDto>;
  storeId: Scalars['ID']['output'];
  totalAmount: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum TOrderStatus {
  CancelledByStore = 'CANCELLED_BY_STORE',
  CancelledByUser = 'CANCELLED_BY_USER',
  Completed = 'COMPLETED',
  Confirmed = 'CONFIRMED',
  Delivered = 'DELIVERED',
  OutForDelivery = 'OUT_FOR_DELIVERY',
  PendingConfirmation = 'PENDING_CONFIRMATION',
  PendingPayment = 'PENDING_PAYMENT',
  Preparing = 'PREPARING',
  ReadyForPickup = 'READY_FOR_PICKUP',
  Refunded = 'REFUNDED'
}

export type TOrderStatusHistory = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  updatedBy?: Maybe<TUser>;
};

export type TOrderStatusHistoryResponseDto = {
  changedAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  status: TOrderStatus;
};

export enum TPaymentCondition {
  Prepayment = 'PREPAYMENT',
  UponReceipt = 'UPON_RECEIPT'
}

export enum TPaymentType {
  Card = 'CARD',
  Cash = 'CASH',
  Sbp = 'SBP'
}

export type TProduct = {
  category: TCategory;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageName?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  parameters?: Maybe<Array<TProductParameter>>;
  priceAmount: Scalars['Float']['output'];
  priceCurrency: Scalars['String']['output'];
  store: TStore;
  updatedAt: Scalars['DateTime']['output'];
};

export type TProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  imageName?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  parameters?: InputMaybe<Array<TProductParameterInput>>;
  priceAmount: Scalars['Float']['input'];
};

export type TProductParameter = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  priceAmount?: Maybe<Scalars['Float']['output']>;
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TProductParameterInput = {
  priceAmount: Scalars['Float']['input'];
  text: Scalars['String']['input'];
};

export type TProductParameterResponseDto = {
  id: Scalars['ID']['output'];
  priceAmount?: Maybe<Scalars['Float']['output']>;
  text: Scalars['String']['output'];
};

export type TProductResponseDto = {
  categoryId: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageName?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  parameters: Array<TProductParameterResponseDto>;
  priceAmount: Scalars['Float']['output'];
  priceCurrency: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TQuery = {
  getActiveCatalog: Array<TCategory>;
  getCategoriesByStore: Array<TCategory>;
  getFullCatalog: Array<TCategory>;
  getProductsByCategory: Array<TProduct>;
  me: TUser;
  store: TStoreResponseDto;
  storeWithDetails: TStoreResponseDto;
  stores: Array<TStoreResponseDto>;
  storesByOwner: Array<TStoreResponseDto>;
  userWithStores?: Maybe<TUser>;
};


export type TQueryGetActiveCatalogArgs = {
  storeId: Scalars['ID']['input'];
};


export type TQueryGetCategoriesByStoreArgs = {
  storeId: Scalars['ID']['input'];
};


export type TQueryGetFullCatalogArgs = {
  storeId: Scalars['ID']['input'];
};


export type TQueryGetProductsByCategoryArgs = {
  categoryId: Scalars['ID']['input'];
};


export type TQueryStoreArgs = {
  id: Scalars['ID']['input'];
};


export type TQueryStoreWithDetailsArgs = {
  id: Scalars['ID']['input'];
};


export type TQueryStoresByOwnerArgs = {
  ownerId: Scalars['ID']['input'];
};


export type TQueryUserWithStoresArgs = {
  id: Scalars['ID']['input'];
};

export enum TReceiveWay {
  Delivery = 'DELIVERY',
  Pickup = 'PICKUP'
}

export type TStore = {
  bannerName?: Maybe<Scalars['String']['output']>;
  bannerUrl?: Maybe<Scalars['String']['output']>;
  categories?: Maybe<Array<Maybe<TCategory>>>;
  createdAt: Scalars['DateTime']['output'];
  deliveryMethods?: Maybe<Array<Maybe<TStoreDeliveryMethodConfig>>>;
  description: Scalars['String']['output'];
  employees?: Maybe<Array<Maybe<TUser>>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  owner: TUser;
  paymentMethods?: Maybe<Array<Maybe<TStorePaymentMethodConfig>>>;
  status: TStoreStatus;
  theme?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type TStoreDeliveryMethodConfig = {
  details?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isEnabled: Scalars['Boolean']['output'];
  receiveWay: TReceiveWay;
};

export type TStoreDeliveryMethodConfigDto = {
  details?: Maybe<Scalars['String']['output']>;
  isEnabled: Scalars['Boolean']['output'];
  receiveWay: Scalars['String']['output'];
};

export type TStoreDeliveryMethodInput = {
  details?: InputMaybe<Scalars['String']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  receiveWay: Scalars['String']['input'];
};

export type TStorePaymentConditionConfigDto = {
  condition: Scalars['String']['output'];
  isEnabled: Scalars['Boolean']['output'];
};

export type TStorePaymentConditionInput = {
  condition?: InputMaybe<Scalars['String']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TStorePaymentMethodConfig = {
  condition: TPaymentCondition;
  id: Scalars['ID']['output'];
  isEnabled: Scalars['Boolean']['output'];
  type: TPaymentType;
};

export type TStorePaymentMethodConfigDto = {
  isEnabled: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
};

export type TStorePaymentMethodInput = {
  condition?: InputMaybe<Scalars['String']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  type: Scalars['String']['input'];
};

export type TStoreResponseDto = {
  bannerName?: Maybe<Scalars['String']['output']>;
  bannerUrl?: Maybe<Scalars['String']['output']>;
  categories?: Maybe<Array<TCategoryResponseDto>>;
  createdAt: Scalars['DateTime']['output'];
  deliveryMethods: Array<TStoreDeliveryMethodConfigDto>;
  description: Scalars['String']['output'];
  employees?: Maybe<Array<TUserResponseDto>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  orders?: Maybe<Array<TOrderResponseDto>>;
  owner: TUserResponseDto;
  paymentConditions: Array<TStorePaymentConditionConfigDto>;
  paymentMethods: Array<TStorePaymentMethodConfigDto>;
  status: TStoreStatus;
  theme?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum TStoreStatus {
  Archived = 'ARCHIVED',
  Draft = 'DRAFT',
  PendingModeration = 'PENDING_MODERATION',
  Published = 'PUBLISHED',
  Rejected = 'REJECTED',
  Suspended = 'SUSPENDED'
}

export type TUpdateStoreInput = {
  bannerName?: InputMaybe<Scalars['String']['input']>;
  bannerUrl?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<Array<TCategoryInput>>;
  deliveryMethods?: InputMaybe<Array<TStoreDeliveryMethodInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  paymentConditions?: InputMaybe<Array<TStorePaymentConditionInput>>;
  paymentMethods?: InputMaybe<Array<TStorePaymentMethodInput>>;
  theme?: InputMaybe<Scalars['String']['input']>;
};

export type TUser = {
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  employeeAt?: Maybe<Array<TStore>>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isBot?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  orders?: Maybe<Array<TOrder>>;
  ownedStores?: Maybe<Array<TStore>>;
  role: Scalars['String']['output'];
  telegramAuthDate?: Maybe<Scalars['Float']['output']>;
  telegramHash?: Maybe<Scalars['String']['output']>;
  telegramId: Scalars['BigInt']['output'];
  updatedAt: Scalars['DateTime']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export type TUserResponseDto = {
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isBot?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  telegramAuthDate?: Maybe<Scalars['Float']['output']>;
  telegramHash?: Maybe<Scalars['String']['output']>;
  telegramId: Scalars['BigInt']['output'];
  updatedAt: Scalars['DateTime']['output'];
  username?: Maybe<Scalars['String']['output']>;
};



export const AuthDocument = /*#__PURE__*/ `
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

export const useAuthMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<TAuthMutation, TError, TAuthMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<TAuthMutation, TError, TAuthMutationVariables, TContext>(
      ['Auth'],
      (variables?: TAuthMutationVariables) => fetcher<TAuthMutation, TAuthMutationVariables>(client, AuthDocument, variables, headers)(),
      options
    )};


useAuthMutation.fetcher = (client: GraphQLClient, variables: TAuthMutationVariables, headers?: RequestInit['headers']) => fetcher<TAuthMutation, TAuthMutationVariables>(client, AuthDocument, variables, headers);

export const CreateStoreDocument = /*#__PURE__*/ `
    mutation CreateStore($ownerId: ID!, $data: CreateStoreInput!) {
  createStore(ownerId: $ownerId, data: $data) {
    id
    name
    status
  }
}
    `;

export const useCreateStoreMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<TCreateStoreMutation, TError, TCreateStoreMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<TCreateStoreMutation, TError, TCreateStoreMutationVariables, TContext>(
      ['CreateStore'],
      (variables?: TCreateStoreMutationVariables) => fetcher<TCreateStoreMutation, TCreateStoreMutationVariables>(client, CreateStoreDocument, variables, headers)(),
      options
    )};


useCreateStoreMutation.fetcher = (client: GraphQLClient, variables: TCreateStoreMutationVariables, headers?: RequestInit['headers']) => fetcher<TCreateStoreMutation, TCreateStoreMutationVariables>(client, CreateStoreDocument, variables, headers);

export const FindByOwnerIdDocument = /*#__PURE__*/ `
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

export const useFindByOwnerIdQuery = <
      TData = TFindByOwnerIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: TFindByOwnerIdQueryVariables,
      options?: UseQueryOptions<TFindByOwnerIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<TFindByOwnerIdQuery, TError, TData>(
      ['FindByOwnerId', variables],
      fetcher<TFindByOwnerIdQuery, TFindByOwnerIdQueryVariables>(client, FindByOwnerIdDocument, variables, headers),
      options
    )};

useFindByOwnerIdQuery.getKey = (variables: TFindByOwnerIdQueryVariables) => ['FindByOwnerId', variables];


useFindByOwnerIdQuery.fetcher = (client: GraphQLClient, variables: TFindByOwnerIdQueryVariables, headers?: RequestInit['headers']) => fetcher<TFindByOwnerIdQuery, TFindByOwnerIdQueryVariables>(client, FindByOwnerIdDocument, variables, headers);

export const FindWithDetailsDocument = /*#__PURE__*/ `
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

export const useFindWithDetailsQuery = <
      TData = TFindWithDetailsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: TFindWithDetailsQueryVariables,
      options?: UseQueryOptions<TFindWithDetailsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<TFindWithDetailsQuery, TError, TData>(
      ['FindWithDetails', variables],
      fetcher<TFindWithDetailsQuery, TFindWithDetailsQueryVariables>(client, FindWithDetailsDocument, variables, headers),
      options
    )};

useFindWithDetailsQuery.getKey = (variables: TFindWithDetailsQueryVariables) => ['FindWithDetails', variables];


useFindWithDetailsQuery.fetcher = (client: GraphQLClient, variables: TFindWithDetailsQueryVariables, headers?: RequestInit['headers']) => fetcher<TFindWithDetailsQuery, TFindWithDetailsQueryVariables>(client, FindWithDetailsDocument, variables, headers);

export type TAuthMutationVariables = Exact<{
  input: TAuthInput;
}>;


export type TAuthMutation = { auth: { id: string, telegramId: any, firstName?: string | null, lastName?: string | null, username?: string | null } };

export type TCreateStoreMutationVariables = Exact<{
  ownerId: Scalars['ID']['input'];
  data: TCreateStoreInput;
}>;


export type TCreateStoreMutation = { createStore: { id: string, name: string, status: TStoreStatus } };

export type TFindByOwnerIdQueryVariables = Exact<{
  ownerId: Scalars['ID']['input'];
}>;


export type TFindByOwnerIdQuery = { storesByOwner: Array<{ id: string, name: string, description: string, bannerUrl?: string | null, bannerName?: string | null, status: TStoreStatus, categories?: Array<{ name: string, priority: number, products?: Array<{ name: string, priceAmount: number, description?: string | null }> | null }> | null }> };

export type TFindWithDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type TFindWithDetailsQuery = { storeWithDetails: { id: string, name: string, description: string, status: TStoreStatus, bannerUrl?: string | null, bannerName?: string | null, categories?: Array<{ id: string, name: string, priority: number, imageUrl?: string | null, imageName?: string | null, products?: Array<{ name: string, priceAmount: number, priceCurrency: string, description?: string | null, imageUrl?: string | null, imageName?: string | null, isActive: boolean, parameters: Array<{ id: string, priceAmount?: number | null, text: string }> }> | null }> | null, paymentMethods: Array<{ type: string }>, paymentConditions: Array<{ condition: string }>, deliveryMethods: Array<{ receiveWay: string, details?: string | null }> } };
