import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import type { MouseEvent } from 'react';
import { Database, Globe, Network, type LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ServiceCard = ({
    title,
    description,
    icon: Icon,
    metric
}: {
    title: string;
    description: string;
    icon: LucideIcon;
    metric: string;
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className="group relative border border-white/10 bg-white/5 px-8 py-10 rounded-2xl overflow-hidden glass-card"
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    backgroundImage: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.15),
              transparent 80%
            )
          `,
                }}
            />

            <div className="relative flex flex-col h-full z-10">
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white/5 border border-white/10 text-brand-500">
                    <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold mb-2 font-mono tracking-tight">{title}</h3>
                <p className="text-white/60 mb-6 flex-grow leading-relaxed">
                    {description}
                </p>

                <div className="pt-6 border-t border-white/10">
                    <span className="text-sm font-mono text-brand-500">{metric}</span>
                </div>
            </div>
        </div>
    );
};

const Services = () => {
    const { t } = useTranslation();
    const services = [
        {
            title: t('services.items.aiDrivenEcosystems.title'),
            description: t('services.items.aiDrivenEcosystems.description'),
            icon: Network,
            metric: t('services.items.aiDrivenEcosystems.metric')
        },
        {
            title: t('services.items.globalApiInfra.title'),
            description: t('services.items.globalApiInfra.description'),
            icon: Globe,
            metric: t('services.items.globalApiInfra.metric')
        },
        {
            title: t('services.items.enterpriseScaling.title'),
            description: t('services.items.enterpriseScaling.description'),
            icon: Database,
            metric: t('services.items.enterpriseScaling.metric')
        }
    ];

    return (
        <section id="services" className="py-32 relative bg-dark">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold font-mono tracking-tighter mb-6"
                    >
                        {t('services.title')}
                    </motion.h2>
                    <div className="h-1 w-20 bg-brand-500" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <ServiceCard {...service} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
