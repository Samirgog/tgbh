import React, { FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';

import { StoreCatalog } from '@/Components/Common/StoreCatalog';
import { Business } from '@/Models/Business';

export const StorePreview: FunctionComponent = () => {
    const location = useLocation();
    const business = location.state?.business as Business;

    return <StoreCatalog business={business} />;
};
