import { useEffect } from "react";

declare global {
    interface Window {
        googleTranslateElementInit?: () => void;
        google?: any;
    }
}

type GoogleTranslatorProps = {
    onReady?: () => void;
};

export function GoogleTranslator({ onReady }: GoogleTranslatorProps) {
    useEffect(() => {
        const SCRIPT_ID = "google-translate-script";
        const ELEMENT_ID = "google_translate_element";

        window.googleTranslateElementInit = () => {
            const el = document.getElementById(ELEMENT_ID);
            if (!el || el.children.length > 0) return;

            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "en",
                    includedLanguages: "rw,en,fr,sw",
                    autoDisplay: false,
                },
                ELEMENT_ID
            );

            onReady?.();
        };

        if (!document.getElementById(SCRIPT_ID)) {
            const script = document.createElement("script");
            script.id = SCRIPT_ID;
            script.src =
                "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.head.appendChild(script);
        } else if (window.google?.translate) {
            window.googleTranslateElementInit();
        }
    }, [onReady]);

    return (
        <>
            {/* Hidden mount point (do not remove) */}
            <div id="google_translate_element" className="hidden" />

            {/* Functional CSS only */}
            <style>{`
        .goog-te-banner-frame,
        iframe.goog-te-banner-frame {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
      `}</style>
        </>
    );
}

/* ---------- helper used by Header ---------- */
export function changeGoogleLanguage(code: string) {
    let attempts = 0;

    const interval = setInterval(() => {
        const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");

        if (select) {
            select.value = code;
            select.dispatchEvent(new Event("change"));
            localStorage.setItem("preferredLanguage", code);
            clearInterval(interval);
        }

        attempts++;
        if (attempts > 20) clearInterval(interval);
    }, 250);
}
