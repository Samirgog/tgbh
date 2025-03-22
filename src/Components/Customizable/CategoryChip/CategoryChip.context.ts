import { createContext } from 'react';

type Context = {
    selected?: boolean;
};

export const CategoryChipContext = createContext<Context>({});
