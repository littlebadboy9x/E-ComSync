import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
    try {
        const token = (await cookies()).get("auth_token")?.value

        if (!token) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
        }

        // Gọi API backend để lấy thông tin người dùng
        const response = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            throw new Error("Failed to fetch user data")
        }

        const userData = await response.json()
        return NextResponse.json(userData)
    } catch (error) {
        console.error("Error fetching user data:", error)
        return NextResponse.json({ message: "Failed to fetch user data" }, { status: 500 })
    }
}
