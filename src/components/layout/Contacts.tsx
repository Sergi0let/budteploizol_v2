import { ContactsIcons } from "@/components/icons";
import { contactPrefix, contactsData } from "@/data";
import { Headset, MapPin } from "lucide-react";

const address = {
  postalCode: "02002",
  city: "м. Київ",
  street: "вул. Микільсько-Слобідська, 6б, офіс 1",
  googleMapsLink:
    "https://maps.google.com/?q=Микільсько-Слобідська+6б,+Київ,+Україна",
};

const Contacts = () => {
  return (
    <div className="bg-[var(--secondary-light)] px-4 py-6 md:py-10">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-3xl font-medium text-zinc-800 md:text-4xl xl:text-5xl">
          <span className="font-semibold text-[var(--main-primary)]">
            Контакти
          </span>{" "}
          – Зв’яжіться з нами
        </h1>
        <p className="mt-3 text-lg text-zinc-700 md:mt-5">
          Ми готові відповісти на ваші запитання та надати професійну
          консультацію щодо тепло- та шумоізоляції.
        </p>
        <div className="mt-6 rounded-lg bg-white p-6 shadow-md md:mt-8">
          <div className="flex items-center gap-3">
            <Headset className="size-8 text-[var(--main-primary)]" />
            <h2 className="text-2xl font-medium text-zinc-800 md:text-3xl">
              Наші контакти
            </h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {contactsData.map((contact) => (
              <div key={contact.id} className="flex items-center gap-3">
                <ContactsIcons
                  contactType={contact.typeContact}
                  className="size-6 flex-shrink-0 text-[var(--main-primary)]"
                />
                <a
                  href={`${contactPrefix[contact.typeContact]}${contact.phone}`}
                  className="text-lg text-zinc-700 hover:text-[var(--main-primary)]"
                >
                  {contact.phone} ({contact.typeContact})
                </a>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div className="flex items-center gap-3">
              <MapPin className="size-8 text-[var(--main-primary)]" />
              <h2 className="text-2xl font-medium text-zinc-800 md:text-3xl">
                Наша адреса
              </h2>
            </div>
            <p className="mt-4 text-lg text-zinc-700">
              {address.postalCode}, {address.city}, {address.street}
            </p>
            <a
              href={address.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-[var(--main-primary)] hover:underline"
            >
              Переглянути на Google Maps
            </a>
          </div>
          <div className="mt-6 flex flex-col gap-4 md:flex-row">
            {/* <a
              href="/contact"
              className="flex items-center justify-center gap-2 rounded-md bg-[var(--main-primary)] px-4 py-2 text-white transition-colors hover:bg-[var(--main-primary-dark)]"
            >
              <Headset className="size-5" />
              Отримати консультацію
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Contacts };
