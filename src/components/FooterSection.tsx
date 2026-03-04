import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-background border-t border-border/30 py-8">
      <div className="container mx-auto px-6 text-center space-y-2">
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} {t.footerRights}
        </p>
        <p className="text-sm font-medium">
          <span className="gradient-text">Yordin Herrera</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
