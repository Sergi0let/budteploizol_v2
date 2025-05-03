import { Dot, Headset } from "lucide-react";
import Link from "next/link";

const heroTxt: string[] = [
  "Надійна тепло- та шумоізоляція для будівництва, автомобілебудування, спорту та легкої промисловості.",
  "Продукція безпосередньо від виробника – гарантія якості та вигідних цін.",
  "Захистіть свій простір від холоду, шуму та вологи за допомогою інноваційних матеріалів БудТеплоІзол.",
];

const Hero = () => {
  return (
    <div className="mb-7 bg-[var(--secondary-light)] px-4 py-6 md:py-10">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-3xl font-semibold text-neutral-700 md:text-4xl xl:text-5xl">
          Буд
          <span className="font-semibold text-[var(--main-primary)]">
            Тепло
          </span>
          Ізол – Експерт у тепло та шумоізоляції від виробника
        </h1>
        <div className="mt-3 space-y-1 font-medium md:mt-5">
          {heroTxt.map((txt, i) => (
            <p key={i} className="text-lg text-neutral-600">
              <Dot className="mr-1 inline-block" /> {txt}
            </p>
          ))}
        </div>
        <Link
          href="/contacts"
          className="mt-3 block text-neutral-600 transition-colors after:content-['_↗'] hover:text-[var(--main-primary)] md:mt-5"
        >
          <Headset className="mr-1 inline-block size-6" /> Зв’яжіться з нами вже
          сьогодні та отримайте персональну консультацію!
        </Link>
      </div>
    </div>
  );
};

export { Hero };
