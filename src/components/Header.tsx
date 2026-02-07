import { useState, useEffect } from 'react';
import { Menu, X, Github } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#hero', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Technical Skills' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled ? 'w-[95%] max-w-7xl' : 'w-[90%] max-w-6xl'
      }`}
    >
      <nav
        className={`relative backdrop-blur-xl rounded-full px-6 py-3 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/90 shadow-2xl shadow-cyan-500/20'
            : 'bg-black/70 shadow-xl'
        }`}
      >
        <div className="flex items-center justify-between">
          <a
            href="#hero"
            className="text-white font-bold text-xl tracking-tight hover:scale-105 transition-transform"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
              Yordin Herrera
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-white/80 hover:text-white font-medium relative group transition-colors"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <a
              href="https://github.com/YordinZ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all"
            >
              <Github size={18} />
              <span>Visit Github</span>
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-white/80 hover:text-white font-medium py-2 hover:pl-2 transition-all"
                  >
                    {item.label}
                  </a>
                </li>
              ))}

              <li className="pt-4 border-t border-white/10">
                <a
                  href="https://github.com/YordinZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white font-semibold"
                >
                  <Github size={18} />
                  <span>Visit Github</span>
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