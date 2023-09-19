import React from "react";
interface Props {
  inputType: string;
  inputName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
function Input({ inputType, inputName, onChange, value }: Props): JSX.Element {
  return (
    <input
      type={inputType}
      name={inputName}
      value={value}
      onChange={onChange}
      className="input"
    ></input>
  );
}
export { Input };
