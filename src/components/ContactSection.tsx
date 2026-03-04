import { useState } from "react";
import { Mail, Send, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mkobvngq";

const ContactSection = () => {
  const { ref, visible } = useReveal();
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _subject: `Portfolio: ${form.name}` }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputClass =
    "w-full px-5 py-3.5 bg-muted/50 border border-border/50 rounded-xl text-white placeholder:text-white/60 text-sm focus:outline-none focus:border-primary/40 transition-colors";

  return (
    <section id="contact" className="section-page flex items-center bg-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-primary/3 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-secondary/3 rounded-full blur-[120px]" />
      </div>

      <div ref={ref} className={`relative z-10 container mx-auto px-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              {t.contactTitle} <span className="gradient-text">{t.contactTitleAccent}</span>
            </h2>
            <div className="w-16 h-0.5 mx-auto rounded-full" style={{ background: "var(--gradient-accent)" }} />
            <p className="text-muted-foreground text-sm">{t.contactSubtitle}</p>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-accent)" }}>
                <Mail className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">{t.emailMe}</h3>
                <p className="text-muted-foreground text-xs">{t.emailResponse}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
              <div className="grid md:grid-cols-2 gap-3">
                <input name="name" value={form.name} onChange={onChange} required placeholder={t.yourName} className={inputClass} />
                <input name="email" type="email" value={form.email} onChange={onChange} required placeholder={t.yourEmail} className={inputClass} />
              </div>
              <textarea name="message" value={form.message} onChange={onChange} required placeholder={t.yourMessage} rows={4} className={`${inputClass} resize-none`} />

              <button type="submit" disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
                style={{ background: "var(--gradient-accent)" }}>
                {status === "loading" ? <Loader2 className="animate-spin text-white" size={18} /> : <Send className="text-white" size={18} />}
                {status === "loading" ? t.sending : t.sendMessage}
              </button>

              {status === "success" && (
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle2 size={16} /> {t.messageSent}
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <XCircle size={16} /> {t.messageError}
                </div>
              )}
            </form>

            <div className="mt-6 pt-5 border-t border-border/30 text-center text-muted-foreground text-xs">
              {t.orEmail}{" "}
              <a className="text-white hover:text-primary underline transition-colors" href="mailto:borge.yordin@icloud.com">
                borge.yordin@icloud.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
