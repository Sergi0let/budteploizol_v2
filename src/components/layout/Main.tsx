export const Main = () => {
  return (
    <div className="px-4">
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-4 lg:grid-cols-[1fr_auto]">
        <div className="flex flex-col items-center justify-center space-y-10">
          <h1 className="mb-4 text-4xl font-bold">Welcome to Budteploizol</h1>
          <p className="mb-4 indent-20">
            Вітаємо на нашому сайті! Тут ви знайдете широкий асортимент
            звукоізоляційних матеріалів та коврів безпосередньо від виробника.
            Наші продукти створені з використанням сучасних технологій, що
            гарантує високу якість, довговічність і ефективність.
          </p>
          <button className="w-fitt group inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out hover:bg-indigo-600 focus:shadow">
            Взнати більше
          </button>
        </div>
        <div className="main-image flex items-center justify-center">
          <div>
            {/* <Image
              src="/main/octagon-bg.png"
              alt="octagon-bg"
              width={500}
              height={500}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
