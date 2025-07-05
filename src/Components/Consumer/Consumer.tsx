import { AnimatePresence, motion } from 'framer-motion';
import { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { OrderScreen } from '@/Components/Consumer/OrderScreen';
import { Map } from '@/Components/Consumer/OrderScreen/Components/Map';
import { Store } from '@/Components/Consumer/Store';
import { RoutesConsumer } from '@/Enums';

const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

export const Consumer: FunctionComponent = () => {
    return (
        <Router>
            <AnimatePresence mode="wait">
                <Routes>
                    <Route
                        path={RoutesConsumer.MAIN}
                        element={
                            <motion.div {...pageVariants}>
                                <Store />
                            </motion.div>
                        }
                    />
                    <Route
                        path={RoutesConsumer.ORDER}
                        element={
                            <motion.div {...pageVariants}>
                                <OrderScreen />
                            </motion.div>
                        }
                    />
                    <Route
                        path={RoutesConsumer.ADDRESS_MAP}
                        element={
                            <motion.div {...pageVariants}>
                                <Map />
                            </motion.div>
                        }
                    />
                </Routes>
            </AnimatePresence>
        </Router>
    );
};
