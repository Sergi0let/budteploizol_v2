export type SectionHeadingProps = {
  title: string;
};

const SectionHeading = ({ title }: SectionHeadingProps) => {
  return (
    <h2 className="flex items-center text-2xl font-medium text-zinc-800 md:text-3xl xl:text-4xl">
      <span className="mr-2 inline-block size-2 rounded-full bg-blue-600 md:mr-3 md:size-3" />
      {title}
    </h2>
  );
};

export { SectionHeading };
