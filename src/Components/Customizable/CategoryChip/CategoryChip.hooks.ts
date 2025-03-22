import { useContext } from 'react';

import { CategoryChipContext } from './CategoryChip.context';

export const useCategoryChipContext = () => useContext(CategoryChipContext);
