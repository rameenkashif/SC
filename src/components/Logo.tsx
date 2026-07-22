import React, { useState } from "react";

interface LogoProps {
  className?: string;
}

/** SC Sports & Leisure wordmark & brand icon component. */
export const Logo: React.FC<LogoProps> = ({ className = "h-9 w-auto" }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className={`flex items-center justify-center font-black text-sky-400 bg-sky-950/80 border border-sky-400/40 rounded-xl px-2.5 py-1 ${className}`}>
        <svg className="w-6 h-6 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12h20" />
          <path d="M2 17c4 0 6 2 10 2s6-2 10-2" />
          <path d="M2 7c4 0 6-2 10-2s6 2 10 2" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src="/logo.png"
      alt="SC Sports & Leisure"
      className={`${className} object-contain filter drop-shadow-[0_2px_8px_rgba(56,189,248,0.4)]`}
      draggable={false}
      onError={() => setImgError(true)}
    />
  );
};
