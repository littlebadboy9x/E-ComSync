export interface LoginRequest {
    username: string;
    password: string;
}

export interface SignupRequest {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    role?: string[];
}

export interface AuthResponse {
    token: string;
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    roles: string[];
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
    try {
        const res = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Đăng nhập thất bại");
        }

        const response = await res.json();
        localStorage.setItem('token', response.token);
        return response;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

export async function register(data: SignupRequest): Promise<void> {
    try {
        const res = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Đăng ký thất bại");
        }
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
}

export async function getCurrentUser(): Promise<AuthResponse> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Chưa đăng nhập');
        }

        const res = await fetch('http://localhost:8080/api/auth/me', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            if (res.status === 401) {
                localStorage.removeItem('token');
                throw new Error('Phiên đăng nhập đã hết hạn');
            }
            const errorData = await res.json();
            throw new Error(errorData.message || "Lỗi khi lấy thông tin người dùng");
        }

        return await res.json();
    } catch (error) {
        console.error('Get current user error:', error);
        throw error;
    }
}

export function logout() {
    localStorage.removeItem('token');
} 