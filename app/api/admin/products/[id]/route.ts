import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id

        // Gọi API backend
        const response = await fetch(`${process.env.BACKEND_API_URL}/api/admin/products/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAuthToken(request)}`,
            },
        })

        if (!response.ok) {
            throw new Error(`Backend API error: ${response.statusText}`)
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error in admin products API route:", error)
        return NextResponse.json({ message: "Failed to fetch product" }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id
        const body = await request.json()

        // Gọi API backend
        const response = await fetch(`${process.env.BACKEND_API_URL}/api/admin/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAuthToken(request)}`,
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
        console.error("Error in admin products API route:", error)
        return NextResponse.json({ message: "Failed to update product" }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id

        // Gọi API backend
        const response = await fetch(`${process.env.BACKEND_API_URL}/api/admin/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAuthToken(request)}`,
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
        console.error("Error in admin products API route:", error)
        return NextResponse.json({ message: "Failed to delete product" }, { status: 500 })
    }
}

function getAuthToken(request: Request): string {
    // Trong thực tế, bạn sẽ lấy token từ cookie hoặc header
    // Đây chỉ là mã giả
    return "dummy_token"
}
