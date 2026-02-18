import GenixLogo from '../ui/GenixLogo';
import Button from '../ui/Button';
import LanguageSwitch from '../ui/LanguageSwitch';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { t } = useTranslation();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference">
            <div className="flex items-center gap-2">
                <GenixLogo className="w-10 h-10" />
                <span className="font-mono font-bold text-xl tracking-tighter">{t('navbar.title')}</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
                <div className="flex gap-8 text-sm font-medium text-white/80">
                    <a href="#services" className="hover:text-white transition-colors">
                        {t('navbar.services')}
                    </a>
                    <a href="#founder" className="hover:text-white transition-colors">
                        {t('navbar.founder')}
                    </a>
                    <a href="#contact" className="hover:text-white transition-colors">
                        {t('navbar.contact')}
                    </a>
                </div>

                {/* Separator */}
                <div className="w-px h-6 bg-white/10" />

                <LanguageSwitch />
            </nav>

            <Button variant="outline" className="hidden md:flex px-6 py-2 text-sm">
                {t('navbar.startProject')}
            </Button>

            {/* Mobile Menu Button could go here, for now just LanguageSwitch for mobile could be considered but keeping consistent with desktop for this step */}
        </header>
    );
};

export default Navbar;
