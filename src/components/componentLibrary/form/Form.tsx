import React from "react";
import clsx from "clsx";
interface Props {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  classes?: string;
}
function Form({ onSubmit, children, classes }: Props): JSX.Element {
  return (
    <form onSubmit={onSubmit} className={clsx("form", classes)}>
      {children}
    </form>
  );
}
export { Form };
