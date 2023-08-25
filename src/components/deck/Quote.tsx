import React from "react";
export default function Quote(): JSX.Element {
  return (
    <section className="quote">
      <p>
        "If you talk to a man in a language he understands, that goes to his{" "}
        <span style={{ fontWeight: "bolder" }}>head</span>. If you talk to him
        in his own language, that goes to his{" "}
        <span style={{ fontWeight: "bolder" }}>heart</span>."
      </p>
      <p style={{ fontStyle: "italic" }}> - Nelson Mandela</p>
    </section>
  );
}
