// components/ui/input.js
import React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef(
  (
    {
      className,
      type = "text",
      "data-error": error,
      "data-success": success,
      "data-icon-placement": iconPlacement,
      ...props
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-neutral-900 placeholder:text-neutral-600/60 bg-transparent ring-transparent border border-neutral-300 transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none data-[error=true]:border-red-500 data-[success=true]:border-green-500 data-[shape=pill]:rounded-full text-base rounded-lg py-3 px-3 ring-4 data-[icon-placement=start]:ps-11 data-[icon-placement=end]:pe-11 hover:border-neutral-800 hover:ring-neutral-800/10 focus:border-neutral-800 focus:ring-neutral-800/10 peer",
          iconPlacement === "start" && "ps-9",
          iconPlacement === "end" && "pe-9",
          error === "true" && "border-red-500",
          success === "true" && "border-green-500",
          className
        )}
        data-error={error}
        data-success={success}
        data-icon-placement={iconPlacement}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
