import { Heart } from 'lucide-react';

const Footer = () => {
  const navItems = [
    { href: '#hero', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Technical Skills' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer className="relative bg-black border-t border-white/10 py-12">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col items-center gap-8">
          <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-white/60 hover:text-white font-medium transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 text-white/60">
            <span>Made with</span>
            <Heart size={16} className="text-fuchsia-500 animate-pulse" />
            <span>for data and technology</span>
          </div>

          <div className="text-center space-y-2">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
            <p className="text-white/60 font-semibold">
              <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                Yordin Herrera
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
