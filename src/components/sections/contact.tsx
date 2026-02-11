"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, MapPin, Send, Github, Linkedin, CheckCircle, AlertCircle } from "lucide-react";
import { XIcon } from "@/components/icons/x-icon";
import { cn } from "@/lib/utils";

const socialLinks = [
  { icon: Github, href: "https://github.com/sa9saQ", label: "GitHub" },
  { icon: XIcon, href: "https://x.com/act_0001", label: "X" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/iori-kobayashi-099745390", label: "LinkedIn" },
];

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ID
  ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
  : null;

function FloatingInput({
  label, name, type = "text", required = false, textarea = false, rows,
}: {
  label: string; name: string; type?: string; required?: boolean; textarea?: boolean; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const isActive = focused || value.length > 0;

  const validate = (val: string) => {
    if (type === "email" && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setError("Invalid email");
    } else {
      setError("");
    }
  };

  const baseClass = cn(
    "w-full px-4 pt-6 pb-2 rounded-xl glass border transition-all focus:outline-none text-foreground placeholder:text-muted-foreground/50 bg-transparent",
    error ? "border-red-500/50 focus:ring-2 focus:ring-red-500/30" : "border-border focus:ring-2 focus:ring-primary/50 focus:border-primary"
  );

  const props = {
    name, required,
    className: cn(baseClass, textarea && "resize-none"),
    onFocus: () => setFocused(true),
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { setFocused(false); validate(e.target.value); },
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setValue(e.target.value); if (error) validate(e.target.value); },
    value,
  };

  return (
    <div className="relative">
      <label className={cn("absolute left-4 transition-all duration-200 pointer-events-none text-muted-foreground", isActive ? "top-1.5 text-xs" : "top-4 text-sm")}>
        {label}
      </label>
      {textarea ? <textarea {...props} rows={rows} /> : <input {...props} type={type} />}
      {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
    </div>
  );
}

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const t = useTranslations("contact");

  const contactInfo = [
    { icon: Mail, label: t("email"), value: "yizhix797@gmail.com", href: "mailto:yizhix797@gmail.com" },
    { icon: MapPin, label: t("location"), value: t("locationValue"), href: null },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setFormError(null);
    const formData = new FormData(e.currentTarget);
    if (!FORMSPREE_ENDPOINT) {
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const subject = formData.get("subject") as string;
      const message = formData.get("message") as string;
      window.location.href = `mailto:yizhix797@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
      setIsSubmitting(false);
      setIsSubmitted(true);
      return;
    }
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, { method: "POST", body: formData, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error();
      setIsSubmitted(true);
    } catch {
      setFormError(t("form.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const headingText = t("heading");

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 relative overflow-hidden">
      {/* Curtain reveal effect */}
      <motion.div
        className="absolute inset-0 bg-background z-20 pointer-events-none origin-top"
        initial={{ scaleY: 1 }}
        animate={isInView ? { scaleY: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
      />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-3">
            {headingText.split("").map((char, i) => (
              <motion.span
                key={i}
                style={{ display: "inline-block" }}
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.04 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h2>
          <p className="text-muted-foreground text-lg">{t("title")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div>
              <h3 className="text-2xl font-heading font-bold mb-4">{t("heading")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("description")}</p>
            </div>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  className={cn("flex items-center gap-4 p-4 glass-card", info.href && "cursor-pointer")}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={info.href ? { x: 10 } : {}}
                >
                  <div className="p-3 rounded-xl glass"><info.icon className="w-6 h-6 text-primary" /></div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    {info.href ? (
                      <a href={info.href} className="font-medium hover:text-primary transition-colors">{info.value}</a>
                    ) : (
                      <p className="font-medium">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-4">{t("followMe")}</p>
              <div className="flex gap-3">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl glass hover:glow-aurora transition-all duration-300 cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={link.label}
                  >
                    <link.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="p-5 sm:p-8 rounded-2xl glass space-y-4 sm:space-y-6">
              {isSubmitted ? (
                <motion.div className="text-center py-12" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-2">{t("form.sent")}</h4>
                  <p className="text-muted-foreground">{t("form.sentMessage")}</p>
                </motion.div>
              ) : (
                <>
                  {formError && (
                    <motion.div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <p className="text-sm">{formError}</p>
                    </motion.div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FloatingInput label={t("form.name")} name="name" required />
                    <FloatingInput label={t("form.email")} name="email" type="email" required />
                  </div>
                  <FloatingInput label={t("form.subject")} name="subject" required />
                  <FloatingInput label={t("form.message")} name="message" textarea rows={5} required />
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "relative w-full py-4 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 transition-all overflow-hidden group cursor-pointer",
                      isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg hover:shadow-primary/25"
                    )}
                    whileHover={isSubmitting ? {} : { scale: 1.02 }}
                    whileTap={isSubmitting ? {} : { scale: 0.98 }}
                  >
                    <span className="absolute inset-0 bg-primary/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    {isSubmitting ? (
                      <motion.div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                    ) : (
                      <><Send className="w-5 h-5" /><span>{t("form.send")}</span></>
                    )}
                  </motion.button>
                </>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
