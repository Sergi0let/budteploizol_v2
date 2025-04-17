import { categoryListData } from "@/data/category";

import { contactPrefix, contactsData, pageLinks } from "@/data";
import { ContactEntityType, ContactType } from "@/types";
import { Dot } from "lucide-react";
import Link from "next/link";
import { ContactsIcons } from "../icons";
import { Separator } from "../ui/separator";

export const Footer = () => {
  return (
    <footer className="mt-10 bg-[var(--secondary-light)]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-start justify-between gap-8 px-4 py-12">
        <div className="">
          <p className="border-b pb-2 text-2xl font-medium uppercase text-zinc-700">
            Каталог
          </p>
          <ul className="">
            {categoryListData.map((item, i) => (
              <li
                key={i}
                className="group flex items-center border-b transition-all duration-500"
              >
                <Dot className="mr-2 text-[var(--main-primary)] group-hover:text-green-600" />
                <Link
                  className="w-full py-4 text-lg text-zinc-500 group-hover:text-[var(--main-primary)]"
                  href={`/catalog/${item.url}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <p className="border-b pb-2 text-2xl font-medium uppercase text-zinc-700">
            КОРИСТУВАЧУ
          </p>
          <ul>
            {pageLinks.map((item, i) => (
              <li key={i}>
                <Link
                  className="block w-full py-3 text-base text-zinc-500 underline-offset-4 transition-colors duration-500 hover:text-[var(--main-primary)] hover:underline"
                  href={item.url}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <p className="border-b pb-2 text-2xl font-medium uppercase text-zinc-700">
            Budteploizol
          </p>
          <ul>
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
          </ul>
        </div>
      </div>
      <Separator className="bg-gray-200" />
      <div className="mx-auto flex max-w-7xl flex-col flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-zinc-500 sm:flex-row md:py-6 md:text-sm">
        <div>
          <sup>©</sup> «Budteploizol», 2022-{new Date().getFullYear()}
        </div>
        <div>розроблено Вашкевич С.</div>
      </div>
    </footer>
  );
};
