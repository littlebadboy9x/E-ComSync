import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { firstName, lastName, email, password } = body

        // Gọi API backend
        const response = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ firstName, lastName, email, password }),
        })

        if (!response.ok) {
            const errorData = await response.json()
            return NextResponse.json({ message: errorData.message || "Registration failed" }, { status: response.status })
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error("Registration error:", error)
        return NextResponse.json({ message: "An error occurred during registration" }, { status: 500 })
    }
}
