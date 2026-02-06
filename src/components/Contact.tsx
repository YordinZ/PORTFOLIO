import { useEffect, useRef, useState } from "react";
import { Mail, Send, Loader2, CheckCircle2, XCircle } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mkobvngq"; // My Formspree

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      section.style.setProperty("--mouse-x", `${x}%`);
      section.style.setProperty("--mouse-y", `${y}%`);
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Nuevo mensaje desde tu portafolio: ${form.name}`,
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden"
      style={{
        background: `
          radial-gradient(
            circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(0, 157, 255, 0.2),
            rgba(255, 0, 255, 0.1) 30%,
            transparent 60%
          ),
          linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)
        `,
      }}
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="absolute inset-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-24 bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-meteor"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold text-white">
              Get In{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-fuchsia-500 mx-auto rounded-full" />
            <p className="text-white/60 text-lg">Let's collaborate on something amazing</p>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />

            <div className="relative bg-black/60 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/10">
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-fuchsia-600 flex items-center justify-center">
                    <Mail className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Email Me</h3>
                    <p className="text-white/60 text-sm">I'll respond within 24 hours</p>
                  </div>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot anti-spam (invisible) */}
                  <input
                    type="text"
                    name="_gotcha"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      required
                      placeholder="Your name"
                      className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onChange}
                      required
                      placeholder="Your email"
                      className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                  </div>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    required
                    placeholder="Your message"
                    rows={5}
                    className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
                  />

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full group/btn relative overflow-hidden px-8 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-[1.02] transition-all disabled:opacity-60 disabled:hover:scale-100"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    <div className="relative flex items-center justify-center gap-3">
                      {status === "loading" ? (
                        <Loader2 className="animate-spin" size={22} />
                      ) : (
                        <Send size={22} className="group-hover/btn:translate-x-1 transition-transform" />
                      )}
                      <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
                    </div>
                  </button>

                  {/* STATUS */}
                  {status === "success" && (
                    <div className="flex items-center gap-2 text-green-300 text-sm">
                      <CheckCircle2 size={18} />
                      <span>Message sent! I’ll reply soon.</span>
                    </div>
                  )}
                  {status === "error" && (
                    <div className="flex items-center gap-2 text-red-300 text-sm">
                      <XCircle size={18} />
                      <span>Something went wrong. Please try again.</span>
                    </div>
                  )}
                </form>

                <div className="flex items-center gap-3 justify-center pt-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20" />
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                    <span className="text-2xl">🐍</span>
                    <span className="text-white/60 text-sm font-medium">Data lover & tech enthusiast</span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20" />
                </div>

                <div className="pt-2 text-center text-white/40 text-sm">
                  Or email me directly:{" "}
                  <a className="text-white/70 hover:text-white underline" href="mailto:borge.yordin@icloud.com">
                    borge.yordin@icloud.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes meteor {
          0% { transform: translateY(-100%) rotate(45deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(300%) rotate(45deg); opacity: 0; }
        }
        .animate-meteor { animation: meteor 3s infinite; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
    </section>
  );
};

export default Contact;
