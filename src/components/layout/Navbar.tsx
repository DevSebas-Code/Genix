import SDLogo from '../ui/SDLogo';
import Button from '../ui/Button';
import LanguageSwitch from '../ui/LanguageSwitch';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { t } = useTranslation();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference">
            <div className="flex items-center gap-2">
                <SDLogo className="w-10 h-10" />
                <span className="font-mono font-bold text-xl tracking-tighter">{t('navbar.title')}</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
                <div className="flex gap-8 text-sm font-medium text-white/80">
                    <a href="#about" className="hover:text-white transition-colors">
                        {t('navbar.about')}
                    </a>
                    <a href="#experience" className="hover:text-white transition-colors">
                        {t('navbar.experience')}
                    </a>
                    <a href="#skills" className="hover:text-white transition-colors">
                        {t('navbar.skills')}
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
                {t('navbar.getInTouch')}
            </Button>
        </header>
    );
};

export default Navbar;
