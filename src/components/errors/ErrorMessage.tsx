import React from "react";
interface ErrorProps {
  error?: Error;
  onReset?: () => void;
}
export default function ErrorMessage({
  error,
  onReset,
}: ErrorProps): JSX.Element {
  const message = error
    ? `${error.name}-${error.message}`
    : "Oops, an error occurred.";
  return (
    <div className="error">
      <h1>Oh no!</h1>
      <p>{message}</p>
    </div>
  );
}
