import React from 'react';
import { motion } from 'framer-motion';

const ThumbManifesto: React.FC = () => {
    const variants = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.5 }}
        >
            {/* Thumbnail content */}
        </motion.div>
    );
};

export default ThumbManifesto;