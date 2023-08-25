import React from "react";
import SelectLang from "./SelectLang";
import TranslateLabel from "./TranslateLabel";

export default function Translate(): JSX.Element {
  return (
    <section className="translate">
      <SelectLang />
      <TranslateLabel />
    </section>
  );
}
