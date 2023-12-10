import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className, type, ...props }) => {
  return (
    <input
      type={type}
      className={`flex h-10 font-light rounded-md border border-input px-2 py-2 text-sm outline-none hover:border-secondary focus:border-secondary transition-colors duration-[400ms] bg-background text-foreground ${className}`}
      {...props}
    />
  );
};

export default Input;
