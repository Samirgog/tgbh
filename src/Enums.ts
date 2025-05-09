export enum RoutesCreator {
    MAIN = '/',
    BUSINESS_EDITOR = '/business-editor',
    CATALOG_PREVIEW = '/catalog-preview',
    BUSINESS_MANAGEMENT = '/business-management',
    BUSINESS_PREVIEW = '/business-preview',
}

export enum RoutesConsumer {
    STORE = '/store',
}

export enum StepBusinessEditor {
    PERSONAL_INFO = 'personal_info',
    BUSINESS_INFO = 'business_info',
    PAYMENT_INFO = 'payment_info',
    RECEIVE_INFO = 'receive_info',
    CATALOG_CONSTRUCTOR = 'catalog_constructor',
}

export enum PaymentType {
    CASH = 'cash',
    SBP = 'sbp',
    CARD = 'card',
}

export enum PaymentCondition {
    PREPAYMENT = 'prepayment',
    UPON_RECEIPT = 'upon_receipt',
}

export enum ReceiveWays {
    PICKUP = 'pickup',
    DELIVERY = 'delivery',
}

export enum DndType {
    CATEGORY = 'category',
    PRODUCT = 'product',
}
