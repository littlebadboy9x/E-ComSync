import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
    // Xóa cookie
    (await cookies()).delete("auth_token");
    (await cookies()).delete("user_role");
    return NextResponse.json({ success: true })
}
