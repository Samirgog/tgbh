import React, { FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';

import { TStoreResponseDto } from '@/api/generated';
import { StoreCatalog } from '@/Components/Common/StoreCatalog';

export const StorePreview: FunctionComponent = () => {
    const location = useLocation();
    const business = location.state?.store as TStoreResponseDto;

    return <StoreCatalog store={business} />;
};
