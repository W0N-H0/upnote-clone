import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <button
      className={`flex justify-center items-center text-background h-10 w-full rounded-md border-none px-2 py-2 text-sm outline-none hover:bg-[#0068ac] bg-secondary ${className}`}
      {...props}
    />
  );
};

export default Button;
