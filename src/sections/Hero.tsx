import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import HeroBackground3D from '../components/ui/HeroBackground3D';
import Button from '../components/ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number],
                staggerChildren: 0.12,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number]
            }
        }
    };

    const letterVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            rotateX: -90,
            WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.4)'
        },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            WebkitTextStroke: '2.5px rgba(212, 171, 36, 0.4)',
            transition: {
                duration: 0.2,
                ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number],
                delay: i * 0.08,
                WebkitTextStroke: {
                    duration: 1.5,
                    ease: "easeInOut",
                    delay: i * 0.01
                }
            }
        })
    };

    const letters = t('hero.title').split("");

    return (
        <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background Layer */}
            <HeroBackground3D containerRef={containerRef} />

            {/* Lighter Gradient Overlay for Better Particle Visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark/20 via-dark/30 to-dark/50 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.4)_100%)] pointer-events-none" />

            {/* Content Layer with Parallax */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-6xl will-change-transform"
            >
                {/* Premium Glass Card Container */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="relative w-full"
                >
                    {/* Main Glass Card - Lighter and More Transparent */}
                    <div className="relative bg-transparent border border-white/10 rounded-3xl p-8 md:p-16">
                        {/* Subtle Border Glow */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-30 pointer-events-none" />

                        {/* Animated Corner Accents */}
                        <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-brand-500/30 rounded-tl-3xl" />
                        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-brand-500/30 rounded-br-3xl" />

                        {/* Content */}
                        <div className="relative space-y-8 pointer-events-none">
                            {/* Tagline */}
                            <motion.div
                                variants={itemVariants}
                                className="flex items-center justify-center gap-2"
                            >
                                <Sparkles className="w-4 h-4 text-brand-500" />
                                <p className="font-mono text-xs md:text-sm tracking-[0.4em] text-brand-500 uppercase">
                                    {t('hero.tagline')}
                                </p>
                                <Sparkles className="w-4 h-4 text-brand-500" />
                            </motion.div>

                            {/* Main Title - GENIX with Glassmorphism Text */}
                            <motion.h1
                                variants={itemVariants}
                                className="relative"
                            >
                                <div className="flex justify-center items-center overflow-visible">
                                    {letters.map((char, i) => (
                                        <motion.span
                                            key={i}
                                            custom={i}
                                            variants={letterVariants}
                                            initial="hidden"
                                            animate="visible"
                                            className="inline-block text-7xl md:text-9xl lg:text-[12rem] font-bold tracking-tighter"
                                            style={{
                                                // Glassmorphic text - more transparent with refined glowing edges
                                                color: 'transparent',
                                                background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.15) 100%)',
                                                WebkitBackgroundClip: 'text',
                                                backgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',



                                                // OPTIMIZATION: Replaced expensive filter: drop-shadow with text-shadow
                                                // text-shadow is much cheaper to render during animations
                                                textShadow: `
                                                    0 0 15px rgba(255, 255, 255, 0.6),
                                                    0 0 30px rgba(255, 255, 255, 0.4),
                                                    0 0 50px rgba(99, 102, 241, 0.4),
                                                    0 0 70px rgba(99, 102, 241, 0.2)
                                                `,
                                                willChange: 'transform, opacity, filter'
                                            }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.div
                                variants={itemVariants}
                                className="space-y-4"
                            >
                                <p className="text-xl md:text-3xl font-light tracking-[0.3em] text-white/90 uppercase">
                                    {t('hero.subtitle')}
                                </p>
                                <div className="w-32 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent mx-auto" />
                            </motion.div>

                            {/* Description */}
                            <motion.p
                                variants={itemVariants}
                                className="text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
                            >
                                {t('hero.description')}
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                variants={itemVariants}
                                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 pointer-events-auto"
                            >
                                <Button variant="primary" size="lg" className="group">
                                    {t('hero.startEvolution')}
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                                <Button variant="outline" size="lg">
                                    {t('hero.viewProjects')}
                                </Button>
                            </motion.div>

                            {/* Stats or Features */}
                            <motion.div
                                variants={itemVariants}
                                className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10"
                            >
                                {[
                                    { value: '50+', label: t('hero.stats.projects') },
                                    { value: '100%', label: t('hero.stats.quality') },
                                    { value: '24/7', label: t('hero.stats.support') }
                                ].map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs md:text-sm text-white/60 uppercase tracking-wider">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-white/50 uppercase tracking-widest">{t('hero.scroll')}</span>
                    <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2">
                        <motion.div
                            className="w-1.5 h-3 bg-brand-500 rounded-full"
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
