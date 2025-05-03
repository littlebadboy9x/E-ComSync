import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    try {
        const slug = params.slug

        // Gọi API backend
        const response = await fetch(`${process.env.BACKEND_API_URL}/api/products/slug/${slug}`, {
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
        console.error("Error in product detail API route:", error)

        // Fallback data in case of error
        const fallbackData = {
            id: 1,
            name: "Wireless Headphones",
            slug: "wireless-headphones",
            description:
                "Experience premium sound quality with our wireless noise cancelling headphones. These headphones feature advanced noise cancellation technology, comfortable ear cups, and long battery life for all-day listening.",
            price: 129.99,
            discount_price: 99.99,
            image_url: "/placeholder.svg?height=600&width=600",
            rating: 4.5,
            reviews: 128,
            stock_quantity: 50,
            category_id: "electronics",
            category_name: "Electronics",
            created_at: "2023-01-15T00:00:00.000Z",
            updated_at: "2023-01-15T00:00:00.000Z",
        }

        return NextResponse.json(fallbackData)
    }
}
