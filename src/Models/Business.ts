import { Catalog } from '@/Models/Catalog';
import { ConsumerTheme } from '@/Models/Theme';
import { PersonalInfo } from '@/Models/User';

export type Business = {
    id: string;
    name: string;
    description: string;
    banner?: { url?: string; name?: string };
    personalInfo: PersonalInfo;
    store: {
        id: string;
        theme?: ConsumerTheme;
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
