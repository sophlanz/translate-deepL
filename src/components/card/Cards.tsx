import React from "react";
import uniqid from "uniqid";
import DeleteControl from "./DeleteControl";
import EditControl from "./EditControl";
import EditCardForm from "./EditCardForm";
import { useCards } from "../../context/card-context";
export default function Cards(): JSX.Element {
  const { cards } = useCards();
  return (
    <>
      {cards.map((card: any) => {
        return (
          <div key={uniqid()} className="card">
            <div className="cardFront">
              <p>{card.front}</p>
            </div>
            <div className="cardBack">
              <p>{card.back}</p>
            </div>
            <div className="cardControls">
              <DeleteControl {...{ cardId: card.id }} />
              <EditControl {...{ cardId: card.id }} />
            </div>
            <EditCardForm {...{ card: card }} />
          </div>
        );
      })}
    </>
  );
}
