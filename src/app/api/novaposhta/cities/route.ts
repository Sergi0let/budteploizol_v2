import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const API_URL = process.env.NOVA_POSHTA_URL!
const API_KEY = process.env.NOVA_POSHTA_API_KEY!

export async function POST(req: Request) {
  console.log("API_Url: ", API_KEY)
  console.log("API_URL: ", API_URL)
  try {
    const { cityName } = await req.json()
    console.log("cityName:", cityName)

    if (!cityName) {
      return NextResponse.json({ message: "City name is required" }, { status: 400 })
    }

    if (!API_URL || !API_KEY) {
      console.error("Missing Nova Poshta API configuration")
      return NextResponse.json({ message: "Server configuration error" }, { status: 500 })
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: API_KEY,
        modelName: "Address",
        calledMethod: "getCities",
        methodProperties: { FindByString: cityName },
      }),
    })

    const data = await response.json()
    console.log("Nova Poshta API response:", data)

    if (!data.success) {
      return NextResponse.json(
        { message: data.errors?.join(", ") || "Nova Poshta API error" },
        { status: 500 }
      )
    }

    if (!data.data || data.data.length === 0) {
      return NextResponse.json({ message: "City not found" }, { status: 404 })
    }

    return NextResponse.json(data.data, { status: 200 })
  } catch (error: unknown) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}