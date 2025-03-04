import { ContactsIcons } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { contactPrefix, contactsData } from "@/data";
import { ContactEntityType, ContactType } from "@/types";
import { Phone } from "lucide-react";

export const ContactMenu = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="icon-wrapper">
            <Phone />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="px-4 py-1">Контакти</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {contactsData.map((contact: ContactEntityType) => (
            <DropdownMenuItem key={contact.id}>
              <a
                className="px-4 py-1 capitalize text-zinc-700"
                href={`${contactPrefix[contact.typeContact]}${contact.phone}`}
              >
                <ContactsIcons
                  contactType={contact.typeContact}
                  className="float-left mr-3 size-6"
                />
                {contact.typeContact === ContactType.Kyivstar ||
                contact.typeContact === ContactType.Vodafone ||
                contact.typeContact === ContactType.Phone
                  ? contact.phone
                  : contact.typeContact}
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
