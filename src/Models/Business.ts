import { s } from 'framer-motion/dist/types.d-B50aGbjN';

import { Catalog } from '@/Models/Catalog';
import { ConsumerTheme } from '@/Models/Theme';

export type PersonalInfo = {
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    isCompanyOwner: boolean;
    acceptedTerms: boolean;
};

export type Business = {
    id: string;
    name: string;
    description: string;
    banner?: { url?: string; name?: string };
    personalInfo: PersonalInfo;
    store: {
        id: string;
        theme: ConsumerTheme;
        catalog: Catalog;
        payment: {
            types: string[];
            conditions: string[];
        };
        receiveInfo: {
            ways: string[];
        };
    };
};
