import { ContactType } from "@/types";
import { KyivstarIcon } from "./KyivstarIcon";
import { TelegramIcon } from "./TelegramIcon";
import { ViberIcon } from "./ViberIcon";
import { VodafoneIcon } from "./VodafoneIcon";
import { WhatsappIcon } from "./WhatsappIcon";

export type ContactsIconsType = {
  contactType: ContactType;
  className: string;
};

const ContactsIcons = ({ className, contactType }: ContactsIconsType) => {
  switch (contactType) {
    case ContactType.Kyivstar:
      return <KyivstarIcon className={className} />;
    case ContactType.Vodafone:
      return <VodafoneIcon className={className} />;
    case ContactType.Whatsapp:
      return <WhatsappIcon className={className} />;
    case ContactType.Telegram:
      return <TelegramIcon className={className} />;
    case ContactType.Viber:
      return <ViberIcon className={className} />;

    default:
      return null;
  }
};

export { ContactsIcons };
