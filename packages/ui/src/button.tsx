"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <button className="bg-blue-400 px-3 py-1 rounded-md text-xl">
      {children}
    </button>
  );
};
