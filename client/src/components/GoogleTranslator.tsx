import { useEffect } from "react";

const SCRIPT_ID = "google-translate-script";
const ELEMENT_ID = "google_translate_element";

type TranslateElementConstructor = (new (
    options: Record<string, unknown>,
    elementId: string
) => unknown) & {
    InlineLayout?: {
        SIMPLE: unknown;
    };
};

interface GoogleTranslateNamespace {
    TranslateElement?: TranslateElementConstructor;
}

declare global {
    interface Window {
        googleTranslateElementInit?: () => void;
        google?: {
            translate?: GoogleTranslateNamespace;
        };
    }
}

const GoogleTranslate = ({ className }: { className?: string }) => {
    useEffect(() => {
        const renderWidget = () => {
            const container = document.getElementById(ELEMENT_ID);
            const hasRendered =
                container?.querySelector(".goog-te-combo") !== null ||
                container?.querySelector(".goog-te-gadget") !== null;

            const TranslateElement = window.google?.translate?.TranslateElement;

            if (!container || hasRendered || !TranslateElement) {
                return;
            }

            new TranslateElement(
                {
                    pageLanguage: "rw",
                    includedLanguages: "rw,en,fr,sw",
                    autoDisplay: false,
                    layout: TranslateElement.InlineLayout?.SIMPLE,
                },
                ELEMENT_ID
            );
        };

        window.googleTranslateElementInit = renderWidget;

        if (window.google?.translate) {
            renderWidget();
            return;
        }

        if (!document.getElementById(SCRIPT_ID)) {
            const script = document.createElement("script");
            script.id = SCRIPT_ID;
            script.src =
                "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.head.appendChild(script);
        }

        return () => {
            if (window.googleTranslateElementInit === renderWidget) {
                delete window.googleTranslateElementInit;
            }
        };
    }, []);

    return (
        <div
            id={ELEMENT_ID}
            className={className}
            aria-label="Choose language for the page"
        />
    );
};

export default GoogleTranslate;