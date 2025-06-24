import { motion, AnimatePresence } from 'framer-motion';

function TemperatureToggle({ isIced, setIsIced, className }) {
    return (
        <div
            className={`relative p-1.5 bg-disabled-temperature-toggle border border-gray-100 rounded-full w-full mx-auto ${className}`}
        >
            {/* Background Slider */}
            <motion.div
                className="absolute inset-0 bg-white border-gray-100 border-[0.5px] shadow-sm rounded-full"
                initial={false}
                animate={{
                    left: isIced ? '50%' : '0%',
                    right: isIced ? '0%' : '50%',
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            />

            <div className="relative flex items-center">
                {/* Hot Option */}
                <button
                    onClick={() => setIsIced(false)}
                    className={`relative z-10 w-1/2 py-2 text-sm font-medium transition-colors border-gray-200 ${
                        !isIced ? 'text-red-600' : 'text-gray-500'
                    }`}
                >
                    <AnimatePresence mode="wait">
                        {!isIced ? (
                            <motion.span
                                key="hot-active"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1.2, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="block"
                            >
                                HOT
                            </motion.span>
                        ) : (
                            <span>HOT</span>
                        )}
                    </AnimatePresence>
                </button>

                {/* Iced Option */}
                <button
                    onClick={() => setIsIced(true)}
                    className={`relative z-10 w-1/2 py-2 text-sm font-medium transition-colors border-gray-200 ${
                        isIced ? 'text-blue-600' : 'text-gray-500'
                    }`}
                >
                    <AnimatePresence mode="wait">
                        {isIced ? (
                            <motion.span
                                key="iced-active"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1.2, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="block"
                            >
                                ICED
                            </motion.span>
                        ) : (
                            <span>ICED</span>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </div>
    );
}

export default TemperatureToggle;
