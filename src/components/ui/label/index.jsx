// components/ui/label.js
import React from "react";
import { cn } from "@/lib/utils";

export const Label = React.forwardRef(({ className, htmlFor, ...props }, ref) => {
  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={cn(
        "font-sans antialiased text-sm text-slate-900 font-semibold",
        className
      )}
      {...props}
    />
  );
});
Label.displayName = "Label";
