import Image from "next/image";
import Link from "next/link";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <header className="container mx-auto max-w-7xl">
        <div className="px-4 py-4 text-left">
          <Link href="/" className="mx-auto block h-auto max-w-[100px]">
            <Image
              className="size-full object-cover"
              src="/logo/logo-main.png"
              width={100}
              height={69}
              alt="Logo"
            />
            <span className="sr-only">Головна</span>
          </Link>
        </div>
      </header>
      {children}
    </>
  );
};
export default Layout;
