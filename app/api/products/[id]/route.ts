import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const idOrSlug = params.id
        let apiUrl = ""
        // Nếu là số, lấy theo id, nếu không lấy theo slug
        if (/^\d+$/.test(idOrSlug)) {
            apiUrl = `${process.env.BACKEND_API_URL}/api/products/${idOrSlug}`
        } else {
            apiUrl = `${process.env.BACKEND_API_URL}/api/products/slug/${idOrSlug}`
        }
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
        return NextResponse.json({ message: "Failed to fetch product" }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id
        const body = await request.json()
        const token = request.headers.get("Authorization")?.split(" ")[1]

        if (!token) {
            return NextResponse.json({ message: "No token provided" }, { status: 401 })
        }

        // Gọi API backend
        const response = await fetch(`${process.env.BACKEND_API_URL}/api/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        })

        if (!response.ok) {
            const errorData = await response.json()
            return NextResponse.json(
                { message: errorData.message || "Failed to update product" },
                { status: response.status },
            )
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error in products API route:", error)
        return NextResponse.json({ message: "Failed to update product" }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id
        const token = request.headers.get("Authorization")?.split(" ")[1]

        if (!token) {
            return NextResponse.json({ message: "No token provided" }, { status: 401 })
        }

        // Gọi API backend
        const response = await fetch(`${process.env.BACKEND_API_URL}/api/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            const errorData = await response.json()
            return NextResponse.json(
                { message: errorData.message || "Failed to delete product" },
                { status: response.status },
            )
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error in products API route:", error)
        return NextResponse.json({ message: "Failed to delete product" }, { status: 500 })
    }
} 