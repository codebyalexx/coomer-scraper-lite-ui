import { ImageLoaderProps } from "next/image";

export const csapiImageLoader = (props: ImageLoaderProps) => {
  return `${props.src}?w=${props.width}&q=${props.quality || 100}`;
};
