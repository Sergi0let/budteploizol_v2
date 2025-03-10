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
          <Link href="/" className="block h-auto max-w-36">
            <Image
              className="size-full object-cover"
              src="/logo/logo-main.png"
              width={180}
              height={46}
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
