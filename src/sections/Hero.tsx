import { motion, useScroll, useTransform, animate, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import HeroBackground3D from '../components/ui/HeroBackground3D';
import Button from '../components/ui/Button';
import { ArrowRight, Download, Sparkles } from 'lucide-react';

// Specialized Counter Component for number animations
const AnimatedCounter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
    const [count, setCount] = useState("0");
    const nodeRef = useRef<HTMLSpanElement>(null);
    const inView = useInView(nodeRef, { once: true, margin: "0px 0px -50px 0px" });

    useEffect(() => {
        if (inView) {
            const controls = animate(0, value, {
                duration: 5,
                ease: [0.16, 1, 0.3, 1],
                onUpdate(current) {
                    setCount(Math.round(current).toString());
                }
            });
            return () => controls.stop();
        }
    }, [inView, value]);

    return (
        <span ref={nodeRef}>
            {count}{suffix}
        </span>
    );
};

const Hero = () => {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const floatingAnimation = {
        y: [0, -15, 0],
        transition: {
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop"
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 40, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 1,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
            }
        }
    };

    const letterVariants = {
        hidden: {
            opacity: 0,
            y: 60,
            rotateX: -60,
            scale: 0.8,
            filter: "blur(12px)"
        },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                delay: i * 0.06 + 0.3
            }
        })
    };

    const letters = t('hero.title').split("");

    return (
        <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Space+Grotesk:wght@300;400;600;700&display=swap');
                `}
            </style>

            {/* Background Layer */}
            <HeroBackground3D containerRef={containerRef} />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark/20 via-dark/40 to-[#050505]/80 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.2)_100%)] pointer-events-none" />

            {/* Content Layer with Parallax */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-6xl will-change-transform"
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative w-full"
                >
                    <motion.div animate={floatingAnimation as import('framer-motion').TargetAndTransition} className="relative">
                        <div className="relative rounded-[2.5rem] p-8 md:p-16 overflow-hidden">
                            {/* Glass backdrop */}
                            <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-2xl border border-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] rounded-[2.5rem] pointer-events-none" />
                            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-60 pointer-events-none" />
                            <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none opacity-60" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-brand-500/10 blur-[100px] rounded-full pointer-events-none" />

                            {/* Content */}
                            <div className="relative space-y-10 pointer-events-none">
                                {/* Tagline */}
                                <motion.div
                                    variants={itemVariants}
                                    className="flex items-center justify-center gap-3"
                                >
                                    <Sparkles className="w-5 h-5 text-brand-400 opacity-80" />
                                    <p className="font-mono text-xs md:text-sm tracking-[0.4em] text-brand-400/90 uppercase font-semibold">
                                        {t('hero.tagline')}
                                    </p>
                                    <Sparkles className="w-5 h-5 text-brand-400 opacity-80" />
                                </motion.div>

                                {/* Main Title */}
                                <motion.h1
                                    className="relative flex justify-center items-center overflow-visible flex-wrap"
                                >
                                    <div className="flex justify-center items-center overflow-visible flex-wrap">
                                        {letters.map((char, i) => (
                                            <motion.span
                                                key={i}
                                                custom={i}
                                                variants={letterVariants}
                                                className="inline-block text-[3rem] md:text-7xl lg:text-[8rem] font-bold tracking-tighter"
                                                style={{
                                                    fontFamily: "'Space Grotesk', sans-serif",
                                                    color: 'transparent',
                                                    WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.4)',
                                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.15) 100%)',
                                                    WebkitBackgroundClip: 'text',
                                                    backgroundClip: 'text',
                                                    textShadow: `
                                                        0 10px 40px rgba(0, 0, 0, 0.6),
                                                        0 0 25px rgba(255, 255, 255, 0.15)
                                                    `,
                                                    willChange: 'transform, opacity, filter'
                                                }}
                                            >
                                                {char === " " ? "\u00A0" : char}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.h1>

                                {/* Subtitle */}
                                <motion.div
                                    variants={itemVariants}
                                    className="space-y-6"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    <p className="text-lg md:text-3xl font-light tracking-[0.3em] text-white/90 uppercase">
                                        {t('hero.subtitle')}
                                    </p>
                                    <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-brand-500/80 to-transparent mx-auto" />
                                </motion.div>

                                {/* Description */}
                                <motion.p
                                    variants={itemVariants}
                                    className="text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed font-light"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    {t('hero.description')}
                                </motion.p>

                                {/* CTA Buttons */}
                                <motion.div
                                    variants={itemVariants}
                                    className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-8 pointer-events-auto"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    <a href="#experience">
                                        <Button variant="primary" size="lg" className="group rounded-full px-8 py-4 bg-brand-500 hover:bg-brand-600 font-medium tracking-wide">
                                            {t('hero.viewExperience')}
                                            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </a>
                                    <Button variant="outline" size="lg" className="group rounded-full px-8 py-4 border-white/20 hover:bg-white/5 font-medium tracking-wide">
                                        <Download className="w-4 h-4 mr-2" />
                                        {t('hero.downloadCV')}
                                    </Button>
                                </motion.div>

                                {/* Stats */}
                                <motion.div
                                    variants={itemVariants}
                                    className="grid grid-cols-3 gap-8 pt-10 mt-10 border-t border-white/[0.06]"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    <div className="text-center group">
                                        <div className="text-3xl md:text-4xl font-semibold text-white/80 mb-2 transition-colors group-hover:text-white">
                                            <AnimatedCounter value={5} suffix="+" />
                                        </div>
                                        <div className="text-[10px] md:text-xs text-brand-400 uppercase tracking-[0.25em] font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                                            {t('hero.stats.experience')}
                                        </div>
                                    </div>

                                    <div className="text-center group">
                                        <div className="text-3xl md:text-4xl font-semibold text-white/80 mb-2 transition-colors group-hover:text-white">
                                            <AnimatedCounter value={4} />
                                        </div>
                                        <div className="text-[10px] md:text-xs text-brand-400 uppercase tracking-[0.25em] font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                                            {t('hero.stats.companies')}
                                        </div>
                                    </div>

                                    <div className="text-center group">
                                        <div className="text-3xl md:text-4xl font-semibold text-white/80 mb-2 transition-colors group-hover:text-white">
                                            ✦
                                        </div>
                                        <div className="text-[10px] md:text-xs text-brand-400 uppercase tracking-[0.25em] font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                                            {t('hero.stats.stack')}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-3"
                >
                    <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {t('hero.scroll')}
                    </span>
                    <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center p-1.5 bg-black/20 backdrop-blur-sm">
                        <motion.div
                            className="w-1.5 h-3 bg-brand-500 rounded-full"
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
