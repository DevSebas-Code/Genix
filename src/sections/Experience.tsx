import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import type { MouseEvent } from 'react';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface JobData {
    role: string;
    company: string;
    period: string;
    location: string;
    description: string;
    achievements: string[];
    tech: string[];
}

const ExperienceCard = ({
    job,
    index,
    isLeft
}: {
    job: JobData;
    index: number;
    isLeft: boolean;
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            className={`relative flex items-center w-full ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Timeline connector for desktop */}
            <div className="hidden md:flex flex-1" />

            {/* Timeline dot */}
            <div className="hidden md:flex flex-col items-center mx-6">
                <motion.div
                    className="w-4 h-4 rounded-full bg-brand-500 border-4 border-dark shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10"
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                />
            </div>

            {/* Card */}
            <div className="flex-1">
                <div
                    className="group relative border border-white/10 bg-white/[0.03] px-6 py-8 md:px-8 md:py-10 rounded-2xl overflow-hidden glass-card hover:border-white/20 transition-all duration-500"
                    onMouseMove={handleMouseMove}
                >
                    {/* Mouse spotlight */}
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                        style={{
                            backgroundImage: useMotionTemplate`
                                radial-gradient(
                                    500px circle at ${mouseX}px ${mouseY}px,
                                    rgba(99, 102, 241, 0.12),
                                    transparent 80%
                                )
                            `,
                        }}
                    />

                    <div className="relative z-10">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-white font-mono tracking-tight">
                                    {job.role}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <Briefcase className="w-4 h-4 text-brand-400" />
                                    <span className="text-brand-400 font-semibold text-sm">{job.company}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 text-right shrink-0">
                                <div className="flex items-center gap-2 text-white/50 text-sm">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span className="font-mono">{job.period}</span>
                                </div>
                                <div className="flex items-center gap-2 text-white/40 text-xs">
                                    <MapPin className="w-3 h-3" />
                                    <span>{job.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-white/50 text-sm leading-relaxed mb-5">
                            {job.description}
                        </p>

                        {/* Achievements */}
                        <ul className="space-y-2 mb-6">
                            {job.achievements.map((achievement, i) => (
                                <motion.li
                                    key={i}
                                    className="flex items-start gap-3 text-sm text-white/60 leading-relaxed"
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15 + i * 0.08 + 0.4 }}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500/60 mt-2 shrink-0" />
                                    <span>{achievement}</span>
                                </motion.li>
                            ))}
                        </ul>

                        {/* Tech Stack Tags */}
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                            {job.tech.map((tech, i) => (
                                <motion.span
                                    key={i}
                                    className="px-3 py-1 text-xs font-mono text-brand-300 bg-brand-500/10 border border-brand-500/20 rounded-full hover:bg-brand-500/20 transition-colors"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15 + i * 0.05 + 0.5 }}
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Experience = () => {
    const { t } = useTranslation();
    const jobs = t('experience.jobs', { returnObjects: true }) as JobData[];

    return (
        <section id="experience" className="py-32 relative bg-dark overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold font-mono tracking-tighter mb-4"
                    >
                        {t('experience.title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/50 text-lg"
                    >
                        {t('experience.subtitle')}
                    </motion.p>
                    <div className="h-1 w-20 bg-brand-500 mt-6" />
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line (desktop only) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500/40 via-brand-500/20 to-transparent" />

                    <div className="space-y-12 md:space-y-16">
                        {jobs.map((job, index) => (
                            <ExperienceCard
                                key={index}
                                job={job}
                                index={index}
                                isLeft={index % 2 === 0}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
