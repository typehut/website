import type { ImageLoader } from "next/image";

export const localImageLoader: ImageLoader = (props) => {
  return props.src;
};
