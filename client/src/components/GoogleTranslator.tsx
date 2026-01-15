import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCRIPT_ID = "google-translate-script";
const ELEMENT_ID = "google_translate_element";

const languages = [
    { code: "rw", name: "Kinyarwanda", icon: "🇷🇼" },
    { code: "en", name: "English", icon: "🇺🇸" },
    { code: "fr", name: "Français", icon: "🇫🇷" },
    { code: "sw", name: "Swahili", icon: "🇹🇿" },
];

export default function GoogleTranslate({ className = "" }) {
    const [currentLanguage, setCurrentLanguage] = useState("rw");

    useEffect(() => {
        const init = () => {
            const el = document.getElementById(ELEMENT_ID);
            if (!el || el.querySelector("select")) return;

            new (window as any).google.translate.TranslateElement(
                {
                    pageLanguage: "rw",
                    includedLanguages: "rw,en,fr,sw",
                    autoDisplay: false,
                },
                ELEMENT_ID
            );
        };

        (window as any).googleTranslateElementInit = init;

        if ((window as any).google?.translate) init();
        else if (!document.getElementById(SCRIPT_ID)) {
            const s = document.createElement("script");
            s.id = SCRIPT_ID;
            s.src =
                "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            s.async = true;
            document.head.appendChild(s);
        }
    }, []);

    const changeLanguage = (code: string) => {
        const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
        if (!select) return;
        select.value = code;
        select.dispatchEvent(new Event("change"));
        setCurrentLanguage(code);
    };

    return (
        <div className={`w-full ${className}`}>
            <div id={ELEMENT_ID} className="hidden" />

            <div className="relative mx-auto w-fit rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl p-1">
                <AnimatePresence mode="wait">
                    <div className="flex gap-1">
                        {languages.map((lang) => {
                            const active = currentLanguage === lang.code;

                            return (
                                <motion.button
                                    key={lang.code}
                                    onClick={() => changeLanguage(lang.code)}
                                    whileTap={{ scale: 0.94 }}
                                    className={`relative flex items-center gap-2 px-4 h-10 rounded-xl text-sm font-medium transition
                    ${active ? "text-white" : "text-slate-300 hover:text-white"}
                  `}
                                >
                                    {active && (
                                        <motion.div
                                            layoutId="lang-pill"
                                            className="absolute inset-0 rounded-xl bg-[#0086df]"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative text-lg">{lang.icon}</span>
                                    <span className="relative hidden sm:block">{lang.name}</span>
                                </motion.button>
                            );
                        })}
                    </div>
                </AnimatePresence>
            </div>

            <style>{`
        .goog-te-banner-frame,
        .goog-te-balloon-frame,
        .goog-te-gadget-icon,
        .goog-te-menu-value {
          display: none !important;
        }
        body { top: 0 !important; }
      `}</style>
        </div>
    );
}
