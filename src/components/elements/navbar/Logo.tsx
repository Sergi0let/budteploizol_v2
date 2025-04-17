import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      href={"/"}
      className={cn("group relative font-black sm:flex-shrink-0", className)}
    >
      <Image
        src="/logo/logo-main.png"
        width={160}
        height={41}
        className="w-[60px] min-w-[60px] md:w-[100px]"
        alt="Logo"
      />
    </Link>
  );
};

export { Logo };
