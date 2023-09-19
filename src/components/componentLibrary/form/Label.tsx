import React from "react";
interface Props {
  htmlFor: string;
  labelName: string;
  children: React.ReactNode;
}
function Label({ htmlFor, labelName, children }: Props): JSX.Element {
  return (
    <label htmlFor={htmlFor} className="label">
      {" "}
      {labelName}
      {children}
    </label>
  );
}
export { Label };
