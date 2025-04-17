import { dataFeatures } from "@/data/features";
import {
  BicepsFlexed,
  Cog,
  Forklift,
  Gem,
  PackagePlus,
  Sprout,
  Star,
  Truck,
} from "lucide-react";

const Features = () => {
  const Icon = (name: string) => {
    switch (name) {
      case "star":
        return <Star strokeWidth={2} className="text-white" />;
      case "sprout":
        return <Sprout strokeWidth={2} className="text-white" />;
      case "truck":
        return <Truck strokeWidth={2} className="text-white" />;
      case "package-plus":
        return <PackagePlus strokeWidth={2} className="text-white" />;
      case "biceps-flexed":
        return <BicepsFlexed strokeWidth={2} className="text-white" />;
      case "forklift":
        return <Forklift strokeWidth={2} className="text-white" />;
      case "gem":
        return <Gem strokeWidth={2} className="text-white" />;
      case "cog":
        return <Cog strokeWidth={2} className="text-white" />;
      default:
        return null;
    }
  };
  return (
    <div className="mb-7 bg-[var(--secondary-light)] md:mb-14">
      <div className="ml-4 md:m-4">
        <div className="container mx-auto max-w-7xl py-6">
          <ul className="features">
            {dataFeatures.map(({ id, icon, description }) => (
              <li key={id}>
                <div className="flex items-center justify-center">
                  <div className="max-w-fit rounded-full bg-[var(--main-primary)] p-2">
                    {Icon(icon)}
                  </div>
                </div>
                <div className="mt-2 md:mt-4">
                  <div className="text-center text-xs md:text-sm lg:text-base">
                    <p>{description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export { Features };
