export enum RoutesCreator {
    MAIN = '/',
    BUSINESS_EDITOR = '/business-editor',
}

export enum StepBusinessEditor {
    PERSONAL_INFO = 'personal_info',
    BUSINESS_INFO = 'business_info',
    PAYMENT_INFO = 'payment_info',
    RECEIVE_INFO = 'receive_info',
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
