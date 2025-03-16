import { FunctionComponent } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { MainScreen } from './MainScreen';
import { BusinessEditorScreen } from '@/Components/Creator/BusinessEditorScreen';
import { RoutesCreator } from '@/Enums';

export const Creator: FunctionComponent = () => {
    return (
        <Router>
            <Routes>
                <Route path={RoutesCreator.MAIN} element={<MainScreen />} />
                <Route path={RoutesCreator.BUSINESS_EDITOR} element={<BusinessEditorScreen />} />
            </Routes>
        </Router>
    );
};
