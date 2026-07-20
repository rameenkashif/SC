import React from "react";

interface LogoProps {
  className?: string;
}

/** SC Sports & Leisure wordmark, exported from the Figma brand file. */
export const Logo: React.FC<LogoProps> = ({ className }) => (
  <img src="/logo.png" alt="SC Sports & Leisure" className={className} draggable={false} />
);
