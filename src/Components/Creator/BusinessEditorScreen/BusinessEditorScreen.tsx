import { AnimatePresence, motion } from 'framer-motion';
import { FunctionComponent } from 'react';
import styled from 'styled-components';

import {
    StepBusinessInfo,
    StepCatalogConstructor,
    StepPaymentInfo,
    StepPersonalInfo,
    StepReceiveInfo,
} from '@/Components/Creator/BusinessEditorScreen/Components';
import { ConsumerThemeProvider } from '@/ConsumerThemeProvider';
import { StepBusinessEditor } from '@/Enums';
import { useBusinessEditorStore } from '@/Store/BusinessEditor';

const Container = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100vh;
    background: #fff;
`;

const StepWrapper = styled(motion.div)`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px;
    overflow-y: auto;
`;

export const BusinessEditorScreen: FunctionComponent = () => {
    const { step, theme } = useBusinessEditorStore();

    return (
        <ConsumerThemeProvider theme={theme}>
            <Container>
                <AnimatePresence mode="wait">
                    <StepWrapper
                        key={step}
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '-100%', opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {
                            {
                                [StepBusinessEditor.PERSONAL_INFO]: <StepPersonalInfo />,
                                [StepBusinessEditor.BUSINESS_INFO]: <StepBusinessInfo />,
                                [StepBusinessEditor.PAYMENT_INFO]: <StepPaymentInfo />,
                                [StepBusinessEditor.RECEIVE_INFO]: <StepReceiveInfo />,
                                [StepBusinessEditor.CATALOG_CONSTRUCTOR]: <StepCatalogConstructor />,
                            }[step]
                        }
                    </StepWrapper>
                </AnimatePresence>
            </Container>
        </ConsumerThemeProvider>
    );
};
