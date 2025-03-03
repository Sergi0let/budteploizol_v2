import { DimensionsType } from "@/types";

type CharacteristicsInfoProps = {
  data: DimensionsType | undefined;
  className?: string;
};

const translateKey = (key: string) => {
  switch (key) {
    case "length":
      return "Ширина";
    case "width":
      return "Довжина";
    case "thickness":
      return "Товщина";
    default:
      return key;
  }
};

const CharacteristicsInfo = ({
  data,
  className = "",
}: CharacteristicsInfoProps) => {
  if (data === undefined || data.length === 0) {
    return null;
  }
  return (
    <div className={`relative overflow-x-auto ${className}`}>
      <table className="w-full text-left text-sm">
        <tbody>
          {Object.entries(data).map(([type, value], i) => (
            <tr
              key={i}
              className={`${i % 2 === 0 ? "bg-white" : "bg-sky-50"} `}
            >
              <th className="rounded-l-lg px-4 py-4 font-normal text-gray-400">
                {translateKey(type)}
              </th>
              <td className="rounded-r-lg py-4 pr-6 font-medium text-zinc-800">
                {value.toString()} мм
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { CharacteristicsInfo };
