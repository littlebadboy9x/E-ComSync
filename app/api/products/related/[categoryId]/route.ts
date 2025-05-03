import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { categoryId: string } }) {
    try {
        const categoryId = params.categoryId
        const url = new URL(request.url)
        const excludeId = url.searchParams.get("excludeId") || ""

        // Gọi API backend
        const response = await fetch(
            `${process.env.BACKEND_API_URL}/api/products/related/${categoryId}?excludeId=${excludeId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            },
        )

        if (!response.ok) {
            throw new Error(`Backend API error: ${response.statusText}`)
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error in related products API route:", error)

        // Fallback data in case of error
        const fallbackData = [
            {
                id: 2,
                name: "Smart Watch",
                slug: "smart-watch",
                price: 199.99,
                discount_price: null,
                image_url: "/placeholder.svg?height=300&width=300",
                rating: 4.2,
                reviews: 95,
                category_id: "electronics",
            },
            {
                id: 3,
                name: "Bluetooth Speaker",
                slug: "bluetooth-speaker",
                price: 79.99,
                discount_price: 59.99,
                image_url: "/placeholder.svg?height=300&width=300",
                rating: 4.7,
                reviews: 156,
                category_id: "electronics",
            },
            {
                id: 5,
                name: "Smartphone Case",
                slug: "smartphone-case",
                price: 24.99,
                discount_price: 19.99,
                image_url: "/placeholder.svg?height=300&width=300",
                rating: 4.1,
                reviews: 64,
                category_id: "electronics",
            },
        ]

        return NextResponse.json(fallbackData)
    }
}
