import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_NOVA_POSHTA_URL!;
const API_KEY = process.env.NEXT_PUBLIC_NOVA_POSHTA_API_KEY!;

export async function POST(req: Request) {
  try {
    const { cityRef, searchNumber } = await req.json();

    if (!cityRef) {
      return NextResponse.json(
        { message: "City Ref is required" },
        { status: 400 },
      );
    }

    const methodProperties: Record<string, string | number> = {
      CityRef: cityRef,
    };

    if (searchNumber) {
      methodProperties.WarehouseId = searchNumber;
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: API_KEY,
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties,
      }),
    });

    const data = await response.json();

    if (searchNumber) {
      return NextResponse.json(data.data, { status: 200 });
    }

    return NextResponse.json(data.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" + error },
      { status: 500 },
    );
  }
}
