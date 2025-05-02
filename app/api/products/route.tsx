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
        let apiUrl = `${process.env.BACKEND_API_URL}/api/products?page=${Number.parseInt(page) - 1}&size=9`

        if (search) apiUrl += `&search=${encodeURIComponent(search)}`
        if (category) apiUrl += `&category=${encodeURIComponent(category)}`

        // Xử lý sắp xếp
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

        // Thêm bộ lọc giá
        if (minPrice) apiUrl += `&minPrice=${minPrice}`
        if (maxPrice) apiUrl += `&maxPrice=${maxPrice}`

        // Gọi API backend
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
        console.error("Error in products API route:", error)

        // Fallback data in case of error
        const fallbackData = {
            content: [
                {
                    id: 1,
                    name: "Wireless Headphones",
                    price: 129.99,
                    discount_price: 99.99,
                    image_url: "/placeholder.svg?height=300&width=300",
                    rating: 4.5,
                    reviews: 128,
                    slug: "wireless-headphones",
                    category_id: "electronics",
                },
                {
                    id: 2,
                    name: "Smart Watch",
                    price: 199.99,
                    discount_price: null,
                    image_url: "/placeholder.svg?height=300&width=300",
                    rating: 4.2,
                    reviews: 95,
                    slug: "smart-watch",
                    category_id: "electronics",
                },
                {
                    id: 3,
                    name: "Bluetooth Speaker",
                    price: 79.99,
                    discount_price: 59.99,
                    image_url: "/placeholder.svg?height=300&width=300",
                    rating: 4.7,
                    reviews: 156,
                    slug: "bluetooth-speaker",
                    category_id: "electronics",
                },
            ],
            totalElements: 3,
            totalPages: 1,
            size: 9,
            number: 0,
        }

        return NextResponse.json(fallbackData)
    }
}
