import React from "react";
import clsx from "clsx";
interface Props {
  text: string;
  onClick?: (
    e: React.MouseEvent
  ) => void | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  type: "button" | "submit" | "reset" | undefined;
  classes?: string;
}
function PrimaryButton({ text, onClick, type, classes }: Props): JSX.Element {
  return (
    <button
      className={clsx("primaryButton", classes)}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}
export { PrimaryButton };
