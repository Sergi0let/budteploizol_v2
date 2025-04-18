import { ContactsIcons } from "@/components/icons";
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
  ContactType,
  SubCategoryRolls,
  SubCategoryRollsDisplayNames,
  SubCategorySoundproofing,
  SubCategorySoundproofingDisplayNames,
} from "@/types";
import { ChevronDown, Menu } from "lucide-react";
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
          <figure className="flex w-full items-center px-2 pt-2">
            <Image
              src="/logo/logo-main.png"
              width={68}
              height={47}
              alt="Лого будтеплоізоляційного заводу"
            />
          </figure>

          <Separator className="mt-0 block xl:hidden" />
          <SheetTitle className="block px-4 pt-4 text-base font-semibold md:text-2xl xl:hidden">
            Категорії товарів
          </SheetTitle>
          <ul className="block xl:hidden">
            {categoryListData.map((link) => {
              if (link.subCategory) {
                return (
                  <>
                    <details
                      className="accordion-details group border-b"
                      name="contact-info"
                    >
                      <summary
                        role="term"
                        aria-details="contact-info"
                        className="accordion-summary relative outline-none"
                      >
                        <div className="flex-1 px-4 py-2 text-base uppercase transition-colors hover:bg-[var(--main-primary)] hover:text-white group-open:bg-[var(--tetriary-secondary)] group-open:text-white">
                          {link.name}
                        </div>
                        <ChevronDown className="absolute right-4 top-1/3 ml-2 size-5 transform transition-transform duration-300 group-open:rotate-180 group-open:text-white group-hover:text-white" />
                      </summary>
                    </details>
                    <div
                      role="definition"
                      id="contact-info"
                      className="accordion-content"
                    >
                      <div className="accordion-content-body">
                        <ul
                          key={`${link.id}-sub`}
                          className="space-y-2 border-b py-3"
                        >
                          <li key={`${link.id}-sub-first`}>
                            <SheetClose asChild>
                              <Link
                                href={`/catalog/${link.url}`}
                                className="mx-2 block cursor-pointer rounded-lg py-1 pl-4 pr-1 text-sm transition-colors hover:bg-[var(--secondary-light)] hover:text-[var(--main-primary)] md:text-base"
                              >{`Усi ${link.name}`}</Link>
                            </SheetClose>
                          </li>
                          {link.subCategory.map(
                            ([subCategoryName, subCategoryLink], i) => (
                              <li key={`${subCategoryName}-${i}`}>
                                <SheetClose asChild>
                                  <Link
                                    className="mx-2 block cursor-pointer rounded-lg py-1 pl-4 pr-1 text-sm transition-colors hover:bg-[var(--secondary-light)] hover:text-[var(--main-primary)] md:text-base"
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
                      </div>
                    </div>
                  </>
                );
              } else {
                return (
                  <li
                    key={`${link.id}-no-sub`}
                    className="border-b border-gray-200"
                  >
                    <SheetClose asChild>
                      <Link
                        className="block cursor-pointer px-4 py-2 uppercase transition-colors hover:bg-[var(--main-primary)] hover:text-white"
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

          <SheetTitle className="font-semisbold px-4 pt-4 text-base md:text-2xl">
            Контакти компанії
          </SheetTitle>
          <ul className="pl-4 md:space-y-3">
            {contactsData.map((contact: ContactEntityType) => (
              <li key={contact.id}>
                <a
                  className="flex items-center py-2 text-lg capitalize text-zinc-700 transition-colors duration-500 hover:text-[var(--main-primary)]"
                  href={`${contactPrefix[contact.typeContact]}${contact.phone}`}
                >
                  <ContactsIcons
                    contactType={contact.typeContact}
                    className="mr-4 size-8 flex-shrink-0"
                  />
                  <span>
                    {contact.typeContact === ContactType.Kyivstar ||
                    contact.typeContact === ContactType.Vodafone ||
                    contact.typeContact === ContactType.Phone
                      ? contact.phone
                      : contact.typeContact}
                  </span>
                </a>
              </li>
            ))}
            {/* {contactsData.map((contact: ContactEntityType) => (
              <li key={contact.id}>
                <SheetClose asChild>
                  <a
                    target="_blank"
                    className="block cursor-pointer px-4 py-2 text-sm capitalize transition-colors hover:bg-[var(--main-primary)] hover:text-white md:text-base"
                    href={`${contactPrefix[contact.typeContact]}${contact.phone}`}
                  >
                    {contact.typeContact}
                  </a>
                </SheetClose>
              </li>
            ))} */}
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
                    className="block cursor-pointer px-4 py-2 uppercase transition-colors hover:bg-[var(--main-primary)] hover:text-white"
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
