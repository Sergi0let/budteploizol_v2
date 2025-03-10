export type SectionHeadingProps = {
  title: string;
  className?: string;
};

const SectionHeading = ({ title, className = "" }: SectionHeadingProps) => {
  return (
    <h2 className={`flex items-center font-medium text-zinc-800 ${className}`}>
      <span className="mr-2 inline-block size-2 rounded-full bg-blue-600 md:mr-3 md:size-2" />
      {title}
    </h2>
  );
};

export { SectionHeading };
