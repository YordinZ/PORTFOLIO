import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { lang, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/50 bg-muted/50 backdrop-blur-sm text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-border transition-all"
      aria-label="Toggle language"
    >
      <span className={lang === "en" ? "text-foreground" : "text-muted-foreground/50"}>EN</span>
      <span className="text-border">/</span>
      <span className={lang === "es" ? "text-foreground" : "text-muted-foreground/50"}>ES</span>
    </button>
  );
};

export default LanguageSwitcher;
