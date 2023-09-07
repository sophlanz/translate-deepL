import React from "react";
interface Props {
  text: string;
  onClick?: (e: React.MouseEvent) => void;
}
export default function PrimaryButton({ text, onClick }: Props): JSX.Element {
  return (
    <button className="primaryButton" onClick={onClick}>
      {text}
    </button>
  );
}
