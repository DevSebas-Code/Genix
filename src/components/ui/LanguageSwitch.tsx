import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const LanguageSwitch = () => {
    const { i18n } = useTranslation();
    const currentLang = i18n.resolvedLanguage || 'en';
    const isEnglish = currentLang.startsWith('en');

    const toggleLanguage = () => {
        const newLang = isEnglish ? 'es' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="relative flex items-center justify-center w-20 h-9 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm cursor-pointer overflow-hidden group hover:border-white/20 transition-colors"
            aria-label="Toggle language"
        >
            {/* Sliding Background Indicator */}
            <motion.div
                className="absolute left-1 top-1 w-[calc(50%-4px)] h-[calc(100%-8px)] rounded-full bg-brand-500/20 border border-brand-500/30"
                animate={{
                    x: isEnglish ? 0 : 36
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                }}
            />

            {/* Labels */}
            <div className="relative z-10 flex w-full h-full text-xs font-mono font-medium tracking-wider">
                <div
                    className={`flex-1 flex items-center justify-center transition-colors duration-300 ${isEnglish ? 'text-white' : 'text-white/40 group-hover:text-white/60'}`}
                >
                    EN
                </div>
                <div
                    className={`flex-1 flex items-center justify-center transition-colors duration-300 ${!isEnglish ? 'text-white' : 'text-white/40 group-hover:text-white/60'}`}
                >
                    ES
                </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
        </button>
    );
};

export default LanguageSwitch;
