import { ContactMenu, Logo, MenuSide, Navigation, Search } from "@/components";
import dynamic from "next/dynamic";

const CartComponent = dynamic(
  () => import("@/components/elements/navbar/Cart"),
  { ssr: false },
);

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 mt-0 bg-white p-2 px-4 text-center shadow-sm">
      <div className="container mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Logo className="sm:mr-3.5" />
        <Navigation />
        <Search />

        <div className="flex items-center gap-2 sm:ml-3.5 lg:gap-4">
          <ContactMenu className="hidden md:block" />
          <CartComponent />
          <MenuSide />
        </div>
      </div>
    </header>
  );
};
