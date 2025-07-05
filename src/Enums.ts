export enum RoutesCreator {
    MAIN = '/',
    BUSINESS_EDITOR = '/business-editor',
    BUSINESS_MANAGEMENT = '/business-management',
    BUSINESS_PREVIEW = '/business-preview',
    PROFILE = '/profile',
}

export enum RoutesConsumer {
    MAIN = '/',
    ORDER = '/order',
    ADDRESS_MAP = '/addresses-map',
}

export enum StepBusinessEditor {
    BUSINESS_INFO = 'business_info',
    PAYMENT_INFO = 'payment_info',
    RECEIVE_INFO = 'receive_info',
    CATALOG_CONSTRUCTOR = 'catalog_constructor',
}

export enum PaymentType {
    CASH = 'CASH',
    SBP = 'SBP',
    CARD = 'CARD',
}

export enum PaymentCondition {
    PREPAYMENT = 'PREPAYMENT',
    UPON_RECEIPT = 'UPON_RECEIPT',
}

export enum ReceiveWays {
    PICKUP = 'PICKUP',
    DELIVERY = 'DELIVERY',
}

export enum DndType {
    CATEGORY = 'category',
    PRODUCT = 'product',
}

export enum UserRole {
    ADMIN = 'ADMIN',
    STORE_OWNER = 'STORE_OWNER',
    CUSTOMER = 'CUSTOMER',
}
