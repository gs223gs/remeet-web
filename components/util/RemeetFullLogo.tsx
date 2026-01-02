import * as React from "react";

import type { LucideProps } from "lucide-react";

export const RemeetFullLogo = React.forwardRef<SVGSVGElement, LucideProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className, ...props },
    ref,
  ) => {
    // 元SVGの縦横比: 293 x 62
    // lucideのsizeは基本「正方形」ですが、横長ワードマークなので、
    // 数値sizeの場合は「高さ=size、幅=比率で算出」にしています。
    const computed =
      typeof size === "number"
        ? { width: (size * 293) / 62, height: size }
        : { width: size, height: size };

    return (
      <svg
        ref={ref}
        width={computed.width}
        height={computed.height}
        viewBox="0 0 293 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M268.5 16.5H261V27.5H268.5C266 57 272.5 63.5 291.5 59L291 47.5C285.262 49.1101 282 49 282 45V27.5H291V16.5H281.5V5.5H268.5V16.5Z" />

        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M68.9968 42.4912H99.9968L100 35.4912C100 29.5078 95.5 14.5 77.9336 14.5C66 14.5 55.5 23.0244 55.5 35.5078C55.5 65.1768 86 67.0078 97.4968 50.4912L88.4968 44.9912C80.5 52.5078 71.5 50.4912 68.9968 42.4912ZM86.5 32.5078H69C70.6592 28.2402 73 26.0078 78 26.0078C83 26.0078 84.6221 27.9971 86.5 32.5078Z"
        />

        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M179.497 42.4912H210.497L210.5 35.4912C210.5 29.5078 206 14.5 188.434 14.5C176.5 14.5 166 23.0244 166 35.5078C166 65.1768 196.5 67.0078 207.997 50.4912L198.997 44.9912C191 52.5078 182 50.4912 179.497 42.4912ZM197 32.5078H179.5C181.159 28.2402 183.5 26.0078 188.5 26.0078C193.5 26.0078 195.122 27.9971 197 32.5078Z"
        />

        <path d="M103 60.5V1.5C123 1.5 113 2.99902 133 27.5C152.5 3.49902 144.5 1.5 163 1.5V60.5H149V28.5C136.5 46.5 136.281 46.5251 133 46.5L132.985 46.4999C129.718 46.4749 129.481 46.4731 117 28.5V60.5H103Z" />

        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M226.997 42.4912H257.997L258 35.4912C258 29.5078 253.5 14.5 235.934 14.5C224 14.5 213.5 23.0244 213.5 35.5078C213.5 65.1768 244 67.0078 255.497 50.4912L246.497 44.9912C238.5 52.5078 229.5 50.4912 226.997 42.4912ZM244.5 32.5078H227C228.659 28.2402 231 26.0078 236 26.0078C241 26.0078 242.622 27.9971 244.5 32.5078Z"
        />

        <path d="M0.5 14.5V0.5H33.5C57 5.5 55 31 41.5 39L55 60H39L28 42.5H20.5V29H31.5C38 28.5 40.5 16.5 31.5 14.5H0.5Z" />
        <path d="M15 29H0.5V60H15V29Z" />
      </svg>
    );
  },
);

RemeetFullLogo.displayName = "RemeetFullLogo";
