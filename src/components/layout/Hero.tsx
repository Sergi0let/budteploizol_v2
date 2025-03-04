import { Dot, Headset } from "lucide-react";

const heroTxt: string[] = [
  "Надійна тепло- та шумоізоляція для будівництва, автомобілебудування, спорту та легкої промисловості.",
  "Продукція безпосередньо від виробника – гарантія якості та вигідних цін.",
  "Захистіть свій простір від холоду, шуму та вологи за допомогою інноваційних матеріалів БудТеплоІзол.",
];

const Hero = () => {
  return (
    <div className="mb-7 bg-sky-50 px-4 pb-5 pt-6 md:pt-10">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-3xl font-medium text-zinc-800 md:text-4xl xl:text-5xl">
          Буд<span className="font-semibold text-blue-600">Тепло</span>Ізол –
          Експерт у тепло та шумоізоляції від виробника
        </h1>
        <div className="mt-3 space-y-1 md:mt-5">
          {heroTxt.map((txt, i) => (
            <p key={i} className="text-lg text-zinc-700">
              <Dot className="mr-1 inline-block" /> {txt}
            </p>
          ))}
        </div>
        <a
          href=""
          className="mt-3 block text-zinc-800 after:content-['_↗'] hover:text-blue-600 md:mt-5"
        >
          <Headset className="mr-1 inline-block size-6" /> Зв’яжіться з нами вже
          сьогодні та отримайте персональну консультацію!
        </a>
      </div>
    </div>
  );
};

export { Hero };
