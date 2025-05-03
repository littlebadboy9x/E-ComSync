export interface CategoryDTO {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
}

export async function fetchCategories(): Promise<CategoryDTO[]> {
    try {
        const token = localStorage.getItem('token');
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch('http://localhost:8080/api/categories', {
            headers,
            cache: 'no-store',
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Lỗi khi lấy danh mục");
        }

        return await res.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

export async function fetchCategoryBySlug(slug: string): Promise<CategoryDTO> {
    try {
        const token = localStorage.getItem('token');
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(`http://localhost:8080/api/categories/${slug}`, {
            headers,
            cache: 'no-store',
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Lỗi khi lấy thông tin danh mục");
        }

        return await res.json();
    } catch (error) {
        console.error('Error fetching category:', error);
        throw error;
    }
} 