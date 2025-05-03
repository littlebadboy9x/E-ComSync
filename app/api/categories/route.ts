import { NextResponse } from "next/server"

export async function GET() {
    try {
        // Gọi API backend
        const response = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        })

        if (!response.ok) {
            throw new Error(`Backend API error: ${response.statusText}`)
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error in categories API route:", error)

        // Fallback data in case of error
        const fallbackData = [
            { id: 1, name: "Electronics", slug: "electronics" },
            { id: 2, name: "Clothing", slug: "clothing" },
            { id: 3, name: "Home & Garden", slug: "home-garden" },
            { id: 4, name: "Beauty & Health", slug: "beauty-health" },
            { id: 5, name: "Sports", slug: "sports" },
            { id: 6, name: "Toys & Games", slug: "toys-games" },
        ]

        return NextResponse.json(fallbackData)
    }
}
