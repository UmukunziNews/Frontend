import GoogleTranslate from "./GoogleTranslator";

export const Languages = () => {
    return (
        <div className="mt-auto w-full px-3">
            <GoogleTranslate className="hidden lg:block max-w-[150px] rounded-md border border-white/20 bg-white/90 p-1 text-xs text-slate-700 shadow-sm backdrop-blur-md" />
        </div>
    );
};