import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        // Lấy các tham số truy vấn
        const searchParams = request.nextUrl.searchParams
        const page = searchParams.get("page") || "1"
        const search = searchParams.get("search") || ""
        const category = searchParams.get("category") || ""
        const sort = searchParams.get("sort") || "featured"
        const minPrice = searchParams.get("minPrice") || ""
        const maxPrice = searchParams.get("maxPrice") || ""

        // Xây dựng URL API backend
        let apiUrl = `${process.env.BACKEND_API_URL}/api/products?page=${Math.max(Number.parseInt(page) - 1, 0)}&size=9`

        if (search) apiUrl += `&search=${encodeURIComponent(search)}`
        if (category) apiUrl += `&category=${encodeURIComponent(category)}`
        if (sort) {
            switch (sort) {
                case "price-asc":
                    apiUrl += "&sort=price,asc"
                    break
                case "price-desc":
                    apiUrl += "&sort=price,desc"
                    break
                case "newest":
                    apiUrl += "&sort=createdAt,desc"
                    break
                case "rating":
                    apiUrl += "&sort=rating,desc"
                    break
                default:
                    // featured - không cần thêm tham số
                    break
            }
        }
        if (minPrice) apiUrl += `&minPrice=${minPrice}`
        if (maxPrice) apiUrl += `&maxPrice=${maxPrice}`

        const response = await fetch(apiUrl, {
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
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const token = request.headers.get("Authorization")?.split(" ")[1]

        if (!token) {
            return NextResponse.json({ message: "No token provided" }, { status: 401 })
        }

        // Gọi API backend
        const response = await fetch(`${process.env.BACKEND_API_URL}/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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
        console.error("Error in products API route:", error)
        return NextResponse.json({ message: "Failed to create product" }, { status: 500 })
    }
}