import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  multiline?: false;
};

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  multiline: true;
};

type InputFieldProps = InputProps | TextareaProps;

export default function InputField(props: InputFieldProps) {
  const { multiline, ...rest } = props;

  if (multiline) {
    return (
      <textarea
        {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        rows={4}
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          backgroundColor: "#f5f5f5",
          color: "#000",
          resize: "none",
        }}
      />
    );
  }

  return (
    <input
      {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
      style={{
        width: "100%",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        backgroundColor: "#f5f5f5",
        color: "#000",
      }}
    />
  );
}
