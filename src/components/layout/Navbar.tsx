import { ContactMenu, Logo, MenuSide, Navigation, Search } from "@/components";
import dynamic from "next/dynamic";

const CartComponent = dynamic(
  () => import("@/components/elements/navbar/Cart"),
  { ssr: false },
);

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 mt-0 overflow-hidden bg-white px-4 py-4 text-center shadow-sm">
      <div className="container mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Logo className="sm:mr-3.5" />
        <Navigation />
        <Search />

        <div className="flex items-center gap-2 lg:gap-4">
          <ContactMenu className="hidden md:block" />
          <CartComponent />
          <MenuSide />
        </div>
      </div>
    </header>
  );
};
