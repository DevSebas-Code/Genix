import { motion } from 'framer-motion';

const SDLogo = ({ className = "w-12 h-12" }: { className?: string }) => {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
                {/* Outer ring with gradient */}
                <motion.circle
                    cx="20"
                    cy="20"
                    r="18"
                    stroke="url(#logoGradient)"
                    strokeWidth="1.5"
                    strokeDasharray="113"
                    initial={{ strokeDashoffset: 113 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                />

                {/* S letter */}
                <motion.path
                    d="M15.5 14.5C15.5 14.5 16.5 12.5 19 12.5C21.5 12.5 23 14 23 15.5C23 17 21.5 18 19.5 18.5C17.5 19 15.5 20 15.5 22C15.5 24 17 25.5 19 25.5C21 25.5 22.5 24.5 22.5 24.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                />

                {/* D letter */}
                <motion.path
                    d="M25 13V27M25 13C25 13 31 14 31 20C31 26 25 27 25 27"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                />

                {/* Accent dot */}
                <motion.circle
                    cx="12"
                    cy="20"
                    r="1.5"
                    fill="#6366f1"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.3, 1] }}
                    transition={{ duration: 0.5, delay: 1.8 }}
                />

                <defs>
                    <linearGradient id="logoGradient" x1="0" y1="0" x2="40" y2="40">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="50%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export default SDLogo;
