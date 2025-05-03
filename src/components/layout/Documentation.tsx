import { Download, FileText, Headset } from "lucide-react";

const documentationData = {
  title: "Санітарно-епідеміологічний висновок",
  number: "№ 87/22619",
  date: "09.01.2013",
  protocol: "№ 3/8-A-1563-17",
  protocolDate: "19.04.2017",
  description:
    "Цей документ підтверджує відповідність матеріалів і виробів TM TERMOLZOL вимогам державної санітарно-епідеміологічної експертизи. Продукція відповідає нормам безпеки для використання в будівництві та інших галузях.",
  issuer:
    "Науковий центр превентивної токсикології, харчової та хімічної безпеки імені академіка Л.І. Медведя",
  contact: "м. Київ, вул. Героїв Оборони, 6, тел. 258-49-59",
};

const Documentation = () => {
  return (
    <div className="bg-[var(--secondary-light)] px-4 py-6 md:py-10">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-3xl font-medium text-zinc-800 md:text-4xl xl:text-5xl">
          <span className="font-semibold text-[var(--main-primary)]">
            Документація
          </span>{" "}
          – Сертифікати та висновки
        </h1>
        <p className="mt-3 text-lg text-zinc-700 md:mt-5">
          Ознайомтеся з офіційними документами, що підтверджують якість та
          безпеку нашої продукції.
        </p>
        <div className="mt-6 rounded-lg bg-white p-6 shadow-md md:mt-8">
          <div className="flex items-center gap-3">
            <FileText className="size-8 text-[var(--main-primary)]" />
            <h2 className="text-2xl font-medium text-zinc-800 md:text-3xl">
              {documentationData.title}
            </h2>
          </div>
          <p className="mt-4 text-lg text-zinc-700">
            {documentationData.description}
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-zinc-700">
                <span className="font-semibold">Номер висновку:</span>{" "}
                {documentationData.number}
              </p>
              <p className="text-zinc-700">
                <span className="font-semibold">Дата видачі:</span>{" "}
                {documentationData.date}
              </p>
              <p className="text-zinc-700">
                <span className="font-semibold">Протокол експертизи:</span>{" "}
                {documentationData.protocol}
              </p>
              <p className="text-zinc-700">
                <span className="font-semibold">Дата протоколу:</span>{" "}
                {documentationData.protocolDate}
              </p>
            </div>
            <div>
              <p className="text-zinc-700">
                <span className="font-semibold">Видавець:</span>{" "}
                {documentationData.issuer}
              </p>
              <p className="text-zinc-700">
                <span className="font-semibold">Контакти:</span>{" "}
                {documentationData.contact}
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-4 md:flex-row">
            <a
              href="/doc/СЕС_химия.pdf"
              className="flex items-center justify-center gap-2 rounded-md bg-[var(--main-primary)] px-4 py-2 text-white transition-colors hover:bg-[var(--main-darker)]"
            >
              <Download className="size-5" />
              Завантажити документ
            </a>
            <a
              href="/contact"
              className="flex items-center justify-center gap-2 rounded-md border border-[var(--main-primary)] px-4 py-2 text-zinc-800 transition-colors hover:text-[var(--main-primary)]"
            >
              <Headset className="size-5" />
              Зв’язатися з нами
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Documentation };
