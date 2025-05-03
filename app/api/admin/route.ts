import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try {
        const url = new URL(request.url)
        const page = url.searchParams.get("page") || "1"
        const search = url.searchParams.get("search") || ""

        // Gọi API backend
        const response = await fetch(
            `${process.env.BACKEND_API_URL}/api/admin/products?page=${Number.parseInt(page) - 1}&size=10&search=${encodeURIComponent(search)}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getAuthToken(request)}`,
                },
            },
        )

        if (!response.ok) {
            throw new Error(`Backend API error: ${response.statusText}`)
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error in admin products API route:", error)
        return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Gọi API backend
        const response = await fetch(`${process.env.BACKEND_API_URL}/api/admin/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAuthToken(request)}`,
            },
            body: JSON.stringify(body),
        })

        if (!response.ok) {
            const errorData = await response.json()
            return NextResponse.json(
                { message: errorData.message || "Failed to create product" },
                { status: response.status },
            )
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error in admin products API route:", error)
        return NextResponse.json({ message: "Failed to create product" }, { status: 500 })
    }
}

function getAuthToken(request: Request): string {
    // Trong thực tế, bạn sẽ lấy token từ cookie hoặc header
    // Đây chỉ là mã giả
    return "dummy_token"
}
