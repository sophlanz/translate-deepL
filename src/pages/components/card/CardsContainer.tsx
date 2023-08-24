import React from "react";
import NewCardForm from "./NewCardForm";
import DeleteControl from "./DeleteControl";
import EditControl from "./EditControl";
export default function CardsContainer(): JSX.Element {
  return (
    <div className="cards">
      <NewCardForm />
      <div className="cardControls">
        <DeleteControl />
        <EditControl />
      </div>
    </div>
  );
}
