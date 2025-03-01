import { SvgProps } from "@/types";
import { useId } from "react";

const VodafoneIcon = ({ className }: SvgProps) => {
  const clipPathId = useId();

  return (
    <svg
      fill="#E60000"
      className={className}
      viewBox="0 0 24 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath={`url(#${clipPathId})`}>
        <path d="M12 24.5c6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12z" />
        <path
          d="M12.096 19.15c-3.277.011-6.687-2.785-6.701-7.276-.01-2.97 1.592-5.832 3.64-7.526 2.002-1.654 4.735-2.715 7.217-2.723.32 0 .653.025.858.094-2.17.45-3.898 2.47-3.89 4.762 0 .064.005.13.015.194 3.631.884 5.28 3.078 5.29 6.107.01 3.029-2.384 6.355-6.43 6.369z"
          fill="#fff"
        />
      </g>
      <defs>
        <clipPath id={clipPathId}>
          <path d="M0 0h24v24H0z" fill="#fff" transform="translate(0 .5)" />
        </clipPath>
      </defs>
    </svg>
  );
};
export { VodafoneIcon };
