import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  variant = "primary",
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      style={{
        width: "100%",
        padding: "10px 16px",
        borderRadius: "6px",
        border: variant === "secondary" ? "1px solid #ddd" : "none",
        backgroundColor: variant === "secondary" ? "#fff" : "#1e293b",
        color: variant === "secondary" ? "#333" : "#fff",
        fontSize: "14px",
        fontWeight: 500,
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
