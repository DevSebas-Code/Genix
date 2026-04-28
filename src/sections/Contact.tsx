import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { Mail, Github, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation();
    return (
        <section id="contact" className="py-32 relative bg-dark">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-mono tracking-tighter mb-6">
                        {t('contact.title')}
                    </h2>
                    <p className="text-xl text-white/60">
                        {t('contact.subtitle')}
                    </p>
                </motion.div>

                <motion.div
                    className="glass p-8 md:p-12 rounded-3xl border border-white/10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-mono text-white/60">{t('contact.form.name')}</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-500 transition-colors text-white"
                                    placeholder={t('contact.form.placeholders.name')}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-mono text-white/60">{t('contact.form.email')}</label>
                                <input
                                    type="email"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-500 transition-colors text-white"
                                    placeholder={t('contact.form.placeholders.email')}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-mono text-white/60">{t('contact.form.message')}</label>
                            <textarea
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-500 transition-colors text-white h-32 resize-none"
                                placeholder={t('contact.form.placeholders.message')}
                            />
                        </div>
                        <div className="flex justify-center pt-4">
                            <Button className="w-full md:w-auto">{t('contact.form.submit')}</Button>
                        </div>
                    </form>
                </motion.div>

                <footer className="mt-32 border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                            <span className="font-mono font-bold text-xl tracking-tighter">SEBASTIÁN DÍAZ</span>
                        </div>
                        <p className="text-sm text-white/40">
                            {t('contact.footer.tagline')}
                        </p>
                    </div>

                    <div className="flex gap-6">
                        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                        <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                        <a href="mailto:sebastian.diaz.dev98@gmail.com" className="text-white/40 hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
                    </div>
                </footer>

                <div className="text-center mt-12 text-xs text-white/20 font-mono">
                    © 2026 Sebastián Díaz. All rights reserved.
                </div>
            </div>
        </section>
    );
};

export default Contact;
