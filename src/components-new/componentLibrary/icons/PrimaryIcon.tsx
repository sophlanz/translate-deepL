import React from "react";
import clsx from "clsx";
import Image, { ImageProps } from "next/image";
interface Props {
  src: string;
  alt: string;
  height: ImageProps["height"];
  width: ImageProps["width"];
  onClick?: (e: React.MouseEvent) => void;
  classes?: string;
}
function PrimaryIcon({
  src,
  alt,
  height,
  width,
  onClick,
  classes,
}: Props): JSX.Element {
  return (
    <div onClick={onClick} className={clsx("primaryIconContainer", classes)}>
      <Image src={src} alt={alt} height={height} width={width} />
    </div>
  );
}
export { PrimaryIcon };
