"use client";

import { ReactNode } from "react";

interface ButtonProps {
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export const Button = ({ children, className, type, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} type={type || "button"} className={`border rounded-full px-4 py-2 w-full text-base font-medium ${className}`}>
      {children}
    </button>
  );
};
