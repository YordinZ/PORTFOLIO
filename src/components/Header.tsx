import { useState, useEffect } from 'react';
import { Menu, X, Github } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#about', label: t.navAbout },
    { href: '#projects', label: t.navProjects },
    { href: '#skills', label: t.navSkills },
    { href: '#contact', label: t.navContact },
  ];

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${isScrolled ? 'w-[95%] max-w-5xl' : 'w-[90%] max-w-4xl'}`}
    >
      <nav
        className={`relative backdrop-blur-2xl rounded-full px-6 py-3 transition-all duration-500 border ${isScrolled
          ? 'bg-background/90 border-border/60 shadow-lg shadow-background/50'
          : 'bg-background/60 border-border/30'
          }`}
      >
        <div className="flex items-center justify-between">
          <a href="#hero" className="font-semibold text-lg tracking-tight text-foreground hover:opacity-80 transition-opacity">
            <span className="gradient-text">Yordin Herrera</span>
          </a>

          <ul className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="relative group text-muted-foreground hover:text-foreground text-sm font-medium transition-colors duration-300">
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-fuchsia-500 group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href="https://github.com/YordinZ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Github size={16} />
              <span>{t.visitGithub}</span>
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-foreground p-2 hover:bg-muted rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-2xl rounded-2xl p-5 shadow-xl border border-border/40">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-muted-foreground hover:text-foreground text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-muted transition-all">
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-3 border-t border-border/40 flex items-center justify-between">
                <LanguageSwitcher />
                <a href="https://github.com/YordinZ" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background text-sm font-semibold">
                  <Github size={16} />
                  <span>{t.visitGithub}</span>
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
