import { motion } from 'framer-motion';

const GenixLogo = ({ className = "w-12 h-12" }: { className?: string }) => {
    // Simplified paths for Helix and G
    // Note: Real production would require precise paths. These are approximations for the effect.
    const helixPath = "M12 4C12 4 16 8 16 12C16 16 12 20 12 20C12 20 8 16 8 12C8 8 12 4 12 4ZM12 4C12 4 20 8 20 12C20 16 12 28 12 28";
    const gPath = "M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C15.5 20 18.5 17.5 19.5 14H12";

    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <svg viewBox="0 0 24 32" className="w-full h-full stroke-current text-white fill-none stroke-2">
                <motion.path
                    d={helixPath} // Initial state: Helix
                    animate={{
                        d: [helixPath, gPath, helixPath], // Loop or morph on interact
                        stroke: ["#fff", "#6366f1", "#fff"]
                    }}
                    transition={{
                        duration: 8,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

export default GenixLogo;
