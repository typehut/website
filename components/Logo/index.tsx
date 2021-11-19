import getConfig from "next/config";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { localImageLoader } from "@/lib/utils/image";

const NAME = "Logo";
const DEFAULT_WIDTH = 118;
const DEFAULT_HEIGHT = 14;
const ASPECT_RATIO = DEFAULT_WIDTH / DEFAULT_HEIGHT;

const { publicRuntimeConfig } = getConfig();

type BaseElement = React.ElementRef<"a">;
type BaseElementProps = JSX.IntrinsicElements["a"];

export interface LogoProps extends BaseElementProps {
  width?: number;
  height?: number;
  isWhite?: boolean;
}

const Logo = React.forwardRef<BaseElement, LogoProps>(
  (props: LogoProps, forwardedRef) => {
    const {
      width: widthProp,
      height: heightProp,
      isWhite = false,
      ...anchorProps
    } = { ...props };

    const imageProps = {
      alt: publicRuntimeConfig.defaultSeo.openGraph.site_name,
      loader: localImageLoader,
      unoptimized: true,
      src: React.useMemo(
        () => `/logo${isWhite ? "-white" : ""}.svg`,
        [isWhite]
      ),
      width: React.useMemo(
        () =>
          widthProp ||
          (heightProp ? Math.round(heightProp * ASPECT_RATIO) : DEFAULT_WIDTH),
        [widthProp, heightProp]
      ),
      height: React.useMemo(
        () =>
          heightProp ||
          (widthProp ? Math.round(widthProp / ASPECT_RATIO) : DEFAULT_HEIGHT),
        [widthProp, heightProp]
      ),
    };

    return (
      <Link href="/">
        <a {...anchorProps} ref={forwardedRef}>
          <div className="flex items-center justify-center w-full h-full">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image {...imageProps} />
          </div>
        </a>
      </Link>
    );
  }
);

Logo.displayName = NAME;

export default Logo;
