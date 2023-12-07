"use client";
import React from "react";

interface HeaderTooltipProps {
  tooltip?: string;
  shortcut?: string;
  children: React.ReactNode;
  translateX: string;
  index?: number;
}

const HeaderTooltip: React.FC<HeaderTooltipProps> = ({
  tooltip,
  children,
  shortcut,
  translateX,
  index,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className={`relative cursor-pointer ${index === 0 ? "mr-2" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered ? (
        <div
          className="flex h-[35px] justify-center items-center absolute left-1/2 top-7 transform opacity-100 transition-opacity duration-200 z-10 p-1 rounded-md bg-focus/90 text-background mt-1 text-sm"
          style={{ transform: `translateX(-${translateX})` }}
        >
          <span className="pl-1 whitespace-nowrap">{tooltip}</span>
          {shortcut ? (
            <div className="mx-1 p-1 bg-gray-300/80 rounded-md whitespace-nowrap">
              {shortcut}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default HeaderTooltip;
