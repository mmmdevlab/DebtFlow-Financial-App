import React from "react";

const ActionButton = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "flex items-center justify-center gap-2 rounded-full transition-all active:scale-95 flex-shrink-0 font-bold text-xs";

  const disabledStyles = disabled
    ? "opacity-30 cursor-not-allowed grayscale active:scale-100"
    : "cursor-pointer";

  const variants = {
    primary: "bg-gray-900 text-white hover:bg-gray-700",
    danger: "bg-red-500 text-white hover:bg-red-700",
    secondary: "bg-green-600 text-white hover:bg-green-700",
    outline: "border border-gray-200 text-gray-600 hover:bg-gray-50",
  };

  const padding =
    typeof children === "string" || React.Children.count(children) > 1
      ? "px-4 py-2"
      : "w-9 h-9";

  return (
    <button
      disabled={disabled}
      onClick={(e) => {
        if (disabled) return;
        e.stopPropagation();
        onClick?.(e);
      }}
      className={`${baseStyles} ${variants[variant]} ${padding} ${disabledStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ActionButton;
