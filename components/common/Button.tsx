import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <button
      className={`flex justify-center items-center text-background h-10 w-full rounded-md border-none text-sm outline-none ${className}`}
      {...props}
    />
  );
};

export default Button;
