import React from "react";
import Image from "next/image";
interface Props {
  nav: HTMLElement | null;
}
function HamburgerButton({ nav }: Props): JSX.Element {
  const handleToggleMenu = () => {
    const button = document.getElementsByClassName("hamburger-menu")[0];
    const expanded = button.getAttribute("aria-expanded");

    const newExpanded = expanded == "true" ? "false" : "true";

    button.setAttribute("aria-expanded", newExpanded);

    if (nav) nav.style.visibility = expanded == "true" ? "hidden" : "visible";
  };

  return (
    <button
      onClick={handleToggleMenu}
      type="button"
      aria-controls="navigation-drawer"
      aria-expanded="false"
      className="hamburger-menu"
    >
      <Image
        src="/icons/burger-menu.png"
        alt="hamburger menu"
        width={40}
        height={40}
        className="hamburger-menu-image"
      />
    </button>
  );
}
export { HamburgerButton };
