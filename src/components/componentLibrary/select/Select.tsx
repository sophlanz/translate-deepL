import clsx from "clsx";
import React from "react";

interface SelectProps {
  children: React.ReactElement<SelectOptionProps, typeof SelectOption>[];
  classes?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}

function Select({
  children,
  classes,
  onChange,
  value,
}: SelectProps): JSX.Element {
  return (
    <select
      className={clsx("select", classes)}
      onChange={onChange}
      value={value}
    >
      {children}
    </select>
  );
}

interface SelectOptionProps {
  value: string;
  classes?: string;
}

function SelectOption({ value, classes }: SelectOptionProps) {
  return (
    <option className={clsx("select-option", classes)} value={value}>
      {value}
    </option>
  );
}
export { Select, SelectOption };
