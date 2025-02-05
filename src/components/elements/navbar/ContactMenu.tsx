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
          <DropdownMenuLabel>Контакти</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {contactsData.map((contact: ContactEntityType) => (
            <DropdownMenuItem key={contact.id}>
              <a
                className="capitalize"
                href={`${contactPrefix[contact.typeContact]}${contact.phone}`}
              >
                {contact.typeContact === ContactType.Phone
                  ? contact.name
                  : contact.typeContact}
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
