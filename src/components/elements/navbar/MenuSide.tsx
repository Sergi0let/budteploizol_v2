import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { contactPrefix, contactsData, pageLinks } from "@/data";
import { categoryListData } from "@/data/category";
import {
  Category,
  CategoryDisplayNames,
  ContactEntityType,
  SubCategoryRolls,
  SubCategoryRollsDisplayNames,
  SubCategorySoundproofing,
  SubCategorySoundproofingDisplayNames,
} from "@/types";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const MenuSide = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="icon-wrapper">
          <Menu className="size-5 sm:size-6" />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="sticky top-0">
          <figure className="flex h-14 w-full items-center px-2 pt-2">
            <Image
              src="/logo/logo-main.png"
              width={120}
              height={31}
              alt="logo budteploizol"
            />
          </figure>

          <Separator className="mt-0 block lg:hidden" />
          <SheetTitle className="block px-4 text-base font-semibold lg:hidden">
            Категорії товарів
          </SheetTitle>
          <ul className="block lg:hidden">
            {categoryListData.map((link) => {
              if (link.subCategory) {
                return (
                  <>
                    <li key={link.id} className="border-b border-gray-200">
                      <SheetClose asChild>
                        <Link
                          className="block cursor-pointer px-4 py-2 uppercase transition-colors hover:bg-blue-600 hover:text-white"
                          href={`/catalog/${link.url}`}
                        >
                          Усi {link.name}
                        </Link>
                      </SheetClose>
                      <ul className="">
                        {link.subCategory.map(
                          ([subCategoryName, subCategoryLink]) => (
                            <li key={subCategoryName}>
                              <SheetClose asChild>
                                <Link
                                  className="mx-2 block cursor-pointer rounded-lg py-1 pl-4 pr-1 text-sm transition-colors hover:bg-sky-50 hover:text-blue-600 md:text-base"
                                  href={
                                    link.name ===
                                    CategoryDisplayNames[Category.Rolls]
                                      ? `/catalog/${Category.Rolls}/${subCategoryLink}`
                                      : link.name ===
                                          CategoryDisplayNames[
                                            Category.Soundproofing
                                          ]
                                        ? `/catalog/${Category.Soundproofing}/${subCategoryLink}`
                                        : "#"
                                  }
                                >
                                  {link.name ===
                                  CategoryDisplayNames[Category.Rolls]
                                    ? SubCategoryRollsDisplayNames[
                                        subCategoryLink as SubCategoryRolls
                                      ]
                                    : link.name ===
                                        CategoryDisplayNames[
                                          Category.Soundproofing
                                        ]
                                      ? SubCategorySoundproofingDisplayNames[
                                          subCategoryLink as SubCategorySoundproofing
                                        ]
                                      : ""}
                                </Link>
                              </SheetClose>
                            </li>
                          ),
                        )}
                      </ul>
                    </li>
                  </>
                );
              } else {
                return (
                  <li key={link.id} className="border-b border-gray-200">
                    <SheetClose asChild>
                      <Link
                        className="block cursor-pointer px-4 py-2 uppercase transition-colors hover:bg-blue-600 hover:text-white"
                        href={`/catalog/${link.url}`}
                      >
                        {link.name}
                      </Link>
                    </SheetClose>
                  </li>
                );
              }
            })}
          </ul>
          <Separator className="mt-0" />
          <SheetTitle className="px-4 text-base font-semibold">
            Контакти компанії
          </SheetTitle>
          <ul>
            {contactsData.map((contact: ContactEntityType) => (
              <li key={contact.id}>
                <SheetClose asChild>
                  <a
                    target="_blank"
                    className="block cursor-pointer px-4 py-2 text-sm capitalize transition-colors hover:bg-blue-600 hover:text-white md:text-base"
                    href={`${contactPrefix[contact.typeContact]}${contact.phone}`}
                  >
                    {contact.typeContact}
                  </a>
                </SheetClose>
              </li>
            ))}
          </ul>
          <Separator className="mt-0" />
          <SheetTitle className="px-4 text-base font-semibold">
            Інформація про компанію
          </SheetTitle>
          <ul>
            {pageLinks.map((link) => (
              <li key={link.id}>
                <SheetClose asChild>
                  <Link
                    className="block cursor-pointer px-4 py-2 uppercase transition-colors hover:bg-blue-600 hover:text-white"
                    href={link.url}
                  >
                    {link.name}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
