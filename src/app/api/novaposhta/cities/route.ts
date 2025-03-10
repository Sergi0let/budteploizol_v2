import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_NOVA_POSHTA_URL!;
const API_KEY = process.env.NEXT_PUBLIC_NOVA_POSHTA_API_KEY!;

export async function POST(req: Request) {
  try {
    const { cityName } = await req.json();

    if (!cityName) {
      return NextResponse.json(
        { message: "City name is required" },
        { status: 400 },
      );
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: API_KEY,
        modelName: "Address",
        calledMethod: "getCities",
        methodProperties: { FindByString: cityName },
      }),
    });

    const data = await response.json();

    if (!data.data.length) {
      return NextResponse.json({ message: "City not found" }, { status: 404 });
    }

    return NextResponse.json(data.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
