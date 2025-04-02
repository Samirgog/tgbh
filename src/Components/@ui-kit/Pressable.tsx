import { HTMLMotionProps, motion } from 'framer-motion';
import { FunctionComponent, ReactNode } from 'react';

type PressableProps = {
    children: ReactNode;
} & HTMLMotionProps<'button'>;

export const Pressable: FunctionComponent<PressableProps> = ({ children, ...props }) => {
    return (
        <motion.button
            whileTap={{
                scale: 1.1,
                boxShadow: '0px 0px 12px rgba(255, 50, 50, 0.5)',
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
                border: 'none',
                background: 'transparent',
                padding: '10px',
                borderRadius: '8px',
            }}
            {...props}
        >
            {children}
        </motion.button>
    );
};
