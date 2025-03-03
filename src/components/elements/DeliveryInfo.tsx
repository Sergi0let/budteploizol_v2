import { DeliveryInfoType } from "@/types";
import { Truck } from "lucide-react";
import Image from "next/image";

type DeliveryInfoProps = {
  data: DeliveryInfoType[];
  className?: string;
};

const DeliveryInfo = ({ data, className = "" }: DeliveryInfoProps) => {
  return (
    <div className={`relative overflow-x-auto ${className}`}>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-gray-400">
            <th className="py-4 pr-6 font-normal uppercase" colSpan={2}>
              Спосіб доставки
            </th>
            <th className="w-1/4 py-4 pr-6 font-normal uppercase">Термін</th>
            <th className="py-4 pr-6 font-normal uppercase">Вартість</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            ({ id, cost, imgUrl, name, time, type }: DeliveryInfoType) => (
              <tr key={id} className="border-t">
                <td className="py-4 pr-2">
                  <figure className="min-w-24">
                    {imgUrl ? (
                      <Image src={imgUrl} width={122} height={48} alt={name} />
                    ) : (
                      <div className="flex items-center justify-center">
                        <Truck />
                      </div>
                    )}
                  </figure>
                  <figcaption className="sr-only">{name}</figcaption>
                </td>
                <td className="py-4 pr-6">
                  <p className="text-nowrap text-zinc-800">{name}</p>
                  <p className="mt-1 text-nowrap text-zinc-600">{type}</p>
                </td>
                <td className="py-4 pr-6">
                  <p>{time}</p>
                </td>
                <td className="py-4">
                  <p className="text-nowrap text-zinc-800">{cost}</p>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
};

export { DeliveryInfo };
