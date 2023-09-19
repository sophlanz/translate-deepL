import React from "react";
interface Props {
  text: string;
  onClick?: (e: React.MouseEvent) => void;
  type: "button" | "submit" | "reset" | undefined;
}
export default function PrimaryButton({
  text,
  onClick,
  type,
}: Props): JSX.Element {
  return (
    <button className="primaryButton" onClick={onClick} type={type}>
      {text}
    </button>
  );
}
