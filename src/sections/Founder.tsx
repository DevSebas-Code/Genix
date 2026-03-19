
import { motion } from 'framer-motion';
import { Code2, Globe, Cpu } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation, Trans } from 'react-i18next';

const Founder = () => {
    const { t } = useTranslation();
    const containerRef = useRef(null);

    const stats = [
        { label: t('founder.stats.experience'), value: "5+ Years", icon: Globe },
        { label: t('founder.stats.projects'), value: "20+", icon: Code2 },
        { label: t('founder.stats.stack'), value: "Full", icon: Cpu },
    ];

    return (
        <section ref={containerRef} id="founder" className="py-32 relative bg-dark overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                {/* Visual Side */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="relative group perspective-1000">
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

                        {/* Image Container */}
                        <div className="relative aspect-[3/5] rounded-2xl overflow-hidden bg-white/5 border border-white/10 ring-1 ring-white/5">
                            <img
                                src="/sebastian.jpg"
                                alt="Sebastian Diaz - Founder of Genix"
                                className="w-full h-full object-cover scale-100 grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                            />

                            {/* Glass Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                        </div>

                        {/* Floating Stats Card - Wrapped to separate entrance and floating animations */}
                        <motion.div
                            className="absolute -bottom-6 -right-6 md:bottom-10 md:-right-12"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            <motion.div
                                className="p-6 glass-card rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/5 shadow-2xl relative overflow-hidden"
                                animate={{ y: [0, -10, 0] }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />
                                <div className="relative z-10 flex gap-4">
                                    {stats.map((stat, i) => (
                                        <div key={i} className="text-center px-4 first:pl-0 last:pr-0 border-r border-white/10 last:border-0">
                                            <stat.icon className="w-5 h-5 text-brand-500 mb-2 mx-auto" />
                                            <div className="font-mono text-xl font-bold text-white">{stat.value}</div>
                                            <div className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Content Side */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                            <span className="text-xs font-mono text-brand-300 tracking-widest uppercase">{t('founder.role')}</span>
                        </div>

                        <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/50">
                            Sebastian<br />Diaz
                        </h2>

                        <div className="space-y-6 text-lg text-white/60 leading-relaxed font-light">
                            <p className="border-l-2 border-brand-500/30 pl-6">
                                <Trans i18nKey="founder.description1">
                                    Founder of Genix. Specialized in transforming complex business visions into <span className="text-white font-medium">scalable, high-impact digital realities</span>.
                                </Trans>
                            </p>
                            <p>
                                <Trans i18nKey="founder.description2">
                                    With a proven track record architecting platforms like <span className="text-brand-400">Reactable AI</span> and <span className="text-brand-400">Junngla SpA</span>, Sebastian bridges the gap between <span className="text-white/80">enterprise-grade engineering</span>—spanning Node.js, Nest.js, and Cloud Infrastructure—and premium product design.
                                </Trans>
                            </p>
                            <p>
                                <Trans i18nKey="founder.description3">
                                    A Certified Scrum Professional dedicated to <span className="text-white/80">agile precision</span> and <span className="text-white/80">evolutionary code quality</span>. We don't just build software; we engineer adaptive systems designed to scale with your business and captivate your users.
                                </Trans>
                            </p>
                        </div>

                        {/* Signature or CTA could go here */}
                        <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                            <div className="font-mono text-xs text-white/40">
                                Founder
                            </div>
                            <div className="font-mono text-xs text-white/40">
                                {t('founder.location')}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Founder;
