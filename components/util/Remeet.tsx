import * as React from "react";

import type { LucideProps } from "lucide-react";

export const Remeet = React.forwardRef<SVGSVGElement, LucideProps>(
  ({ size = 24, className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 1024 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={className}
        {...props}
      >
        <circle cx="512" cy="512" r="512" fill="url(#paint0_linear_76_6)" />
        <rect
          x="440"
          y="98"
          width="173"
          height="171"
          fill="url(#pattern0_76_6)"
        />
        <path
          d="M127.098 374.944V286H340.125C480.679 310.158 508.131 485.85 398.324 567.108C444.443 665.935 511.426 673.622 593.781 586.874C597.571 669.578 587.193 702.172 547.662 721.937C465.306 754.88 389.539 743.899 308.281 592.364H255.573V502.321H319.262C386.245 491.341 398.324 392.514 319.262 374.944H127.098Z"
          fill="white"
        />
        <path
          d="M214.944 503.419H126V732.917H214.944V503.419Z"
          fill="#FEFEFE"
        />
        <path
          d="M550.956 323.341H497.15L498.248 601.155C524.602 601.155 536.54 588.238 590.487 527.583V505.622C651.979 581.383 667.353 628.607 698.099 628.607C740.924 628.607 735.433 592.364 809.005 505.622V734.022H897.949V323.341H846.339C811.201 323.341 763.462 414.181 698.099 505.622C617.621 387.934 587.193 323.341 550.956 323.341Z"
          fill="white"
        />

        <defs>
          <pattern
            id="pattern0_76_6"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0_76_6"
              transform="matrix(0.00287897 0 0 0.00290406 0 0.00390625)"
            />
          </pattern>

          <linearGradient
            id="paint0_linear_76_6"
            x1="512"
            y1="0"
            x2="512"
            y2="1024"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F9B516" />
            <stop offset="1" stopColor="#F97316" />
          </linearGradient>

          {/* ここに image0_76_6 の定義が必要（元SVGの defs にあるはず） */}
          {/* <image id="image0_76_6" width="..." height="..." xlinkHref="data:image/png;base64,..." /> */}
        </defs>
      </svg>
    );
  },
);

Remeet.displayName = "Remeet";
