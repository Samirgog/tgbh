import { AnimatePresence, motion } from 'framer-motion';
import { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { StoreCatalog } from '@/Components/Common/StoreCatalog';
import { BusinessEditorScreen } from '@/Components/Creator/BusinessEditorScreen';
import { BusinessManagementScreen } from '@/Components/Creator/BusinessManagementScreen';
import { RoutesCreator } from '@/Enums';

import { MainScreen } from './MainScreen';

const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

export const Creator: FunctionComponent = () => {
    return (
        <Router>
            <AnimatePresence mode="wait">
                <Routes>
                    <Route
                        path={RoutesCreator.MAIN}
                        element={
                            <motion.div {...pageVariants}>
                                <MainScreen />
                            </motion.div>
                        }
                    />
                    <Route
                        path={RoutesCreator.BUSINESS_EDITOR}
                        element={
                            <motion.div {...pageVariants}>
                                <BusinessEditorScreen />
                            </motion.div>
                        }
                    />
                    <Route
                        path={RoutesCreator.BUSINESS_MANAGEMENT}
                        element={
                            <motion.div {...pageVariants}>
                                <BusinessManagementScreen />
                            </motion.div>
                        }
                    />
                    <Route
                        path={RoutesCreator.BUSINESS_PREVIEW}
                        element={
                            <motion.div {...pageVariants}>
                                <StoreCatalog mode="preview" />
                            </motion.div>
                        }
                    />
                </Routes>
            </AnimatePresence>
        </Router>
    );
};
