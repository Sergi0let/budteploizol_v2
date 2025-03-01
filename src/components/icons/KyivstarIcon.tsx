import { SvgProps } from "@/types";

const KyivstarIcon = ({ className }: SvgProps) => {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12.5" fill="#00A0FF" r="12" />
      <path d="M12 5.814v3.729-3.729z" fill="#000" />
      <path
        d="M12 5.814v3.729"
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
      <path d="M18.66 10.79l-3.447 1.152 3.447-1.153z" fill="#000" />
      <path
        d="M18.66 10.79l-3.447 1.152"
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
      <path d="M16.117 18.84l-2.13-3.017 2.13 3.016z" fill="#000" />
      <path
        d="M16.117 18.84l-2.13-3.017"
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
      <path d="M7.887 18.84l2.13-3.017-2.13 3.016z" fill="#000" />
      <path
        d="M7.887 18.84l2.13-3.017"
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
      <path d="M5.344 10.79l3.447 1.152-3.447-1.153z" fill="#000" />
      <path
        d="M5.344 10.79l3.447 1.152"
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
    </svg>
  );
};
export { KyivstarIcon };
