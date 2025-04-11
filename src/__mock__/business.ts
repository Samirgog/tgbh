import { mockCatalog } from '@/__mock__/catalog';
import bannerMock from '@/assets/banner-test.png';
import { PaymentCondition, PaymentType, ReceiveWays } from '@/Enums';
import { Business } from '@/Models/Business';
import { consumerTheme } from '@/Styles/theme';

export const mockBusiness: Business = {
    id: '123-123-123',
    name: 'Шаурма дяди Федора',
    description: 'Вкусовые сосочки довольны',
    banner: { url: bannerMock, name: 'banner-test.png' },
    personalInfo: {
        firstName: 'Федор',
        lastName: 'Дядя',
        middleName: 'Петрович',
        email: 'test@test.com',
        isCompanyOwner: true,
        acceptedTerms: true,
    },
    store: {
        id: '123-234-345',
        theme: consumerTheme.blue,
        catalog: mockCatalog,
        payment: {
            types: [PaymentType.SBP, PaymentType.CARD],
            conditions: [PaymentCondition.PREPAYMENT],
        },
        receiveInfo: {
            ways: [ReceiveWays.PICKUP],
        },
    },
};
