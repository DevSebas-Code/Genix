import { motion, useMotionTemplate, useMotionValue, useInView } from 'framer-motion';
import type { MouseEvent } from 'react';
import { useRef } from 'react';
import { Monitor, Server, Database, Cloud } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SkillItem {
    name: string;
    level: number;
}

interface SkillCategory {
    title: string;
    items: SkillItem[];
}

const categoryIcons: Record<string, typeof Monitor> = {
    frontend: Monitor,
    backend: Server,
    database: Database,
    cloud: Cloud,
};

const categoryColors: Record<string, { bar: string; glow: string; border: string }> = {
    frontend: {
        bar: 'bg-gradient-to-r from-blue-500 to-cyan-400',
        glow: 'rgba(59, 130, 246, 0.15)',
        border: 'border-blue-500/20',
    },
    backend: {
        bar: 'bg-gradient-to-r from-green-500 to-emerald-400',
        glow: 'rgba(34, 197, 94, 0.15)',
        border: 'border-green-500/20',
    },
    database: {
        bar: 'bg-gradient-to-r from-amber-500 to-yellow-400',
        glow: 'rgba(245, 158, 11, 0.15)',
        border: 'border-amber-500/20',
    },
    cloud: {
        bar: 'bg-gradient-to-r from-purple-500 to-violet-400',
        glow: 'rgba(168, 85, 247, 0.15)',
        border: 'border-purple-500/20',
    },
};

const SkillBar = ({
    skill,
    delay,
    color,
}: {
    skill: SkillItem;
    delay: number;
    color: string;
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-30px" });

    return (
        <div ref={ref} className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-sm text-white/80 font-medium">{skill.name}</span>
                <motion.span
                    className="text-xs font-mono text-white/40"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: delay + 0.5 }}
                >
                    {skill.level}%
                </motion.span>
            </div>
            <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden relative">
                <motion.div
                    className={`h-full rounded-full ${color} relative`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{
                        duration: 1.2,
                        delay: delay,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_ease-in-out_infinite]" />
                </motion.div>
            </div>
        </div>
    );
};

const SkillCategoryCard = ({
    categoryKey,
    category,
    index,
}: {
    categoryKey: string;
    category: SkillCategory;
    index: number;
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const Icon = categoryIcons[categoryKey] || Monitor;
    const colors = categoryColors[categoryKey] || categoryColors.frontend;

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <div
                className={`group relative border ${colors.border} bg-white/[0.02] p-6 md:p-8 rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-500 h-full`}
                onMouseMove={handleMouseMove}
            >
                {/* Mouse spotlight */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        backgroundImage: useMotionTemplate`
                            radial-gradient(
                                400px circle at ${mouseX}px ${mouseY}px,
                                ${colors.glow},
                                transparent 80%
                            )
                        `,
                    }}
                />

                <div className="relative z-10">
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border ${colors.border}`}>
                            <Icon className="w-5 h-5 text-white/70" />
                        </div>
                        <h3 className="text-lg font-bold font-mono tracking-tight text-white">
                            {category.title}
                        </h3>
                    </div>

                    {/* Skills */}
                    <div className="space-y-5">
                        {category.items.map((skill, i) => (
                            <SkillBar
                                key={skill.name}
                                skill={skill}
                                delay={index * 0.12 + i * 0.1 + 0.2}
                                color={colors.bar}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Skills = () => {
    const { t } = useTranslation();
    const categories = t('skills.categories', { returnObjects: true }) as Record<string, SkillCategory>;

    return (
        <section id="skills" className="py-32 relative bg-dark overflow-hidden">
            {/* Ambient */}
            <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold font-mono tracking-tighter mb-4"
                    >
                        {t('skills.title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/50 text-lg"
                    >
                        {t('skills.subtitle')}
                    </motion.p>
                    <div className="h-1 w-20 bg-brand-500 mt-6" />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {Object.entries(categories).map(([key, category], index) => (
                        <SkillCategoryCard
                            key={key}
                            categoryKey={key}
                            category={category}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
