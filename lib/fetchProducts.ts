export async function fetchProducts(params: any) {
  // Loại bỏ các param undefined, null hoặc 'undefined'
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== "undefined")
  ) as Record<string, string>;
  const query = new URLSearchParams(filteredParams).toString();
  let headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Chỉ thêm Authorization nếu đang ở client
  if (typeof window !== "undefined") {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const res = await fetch(`http://localhost:8080/api/products?${query}`, {
    headers,
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Lỗi khi lấy dữ liệu sản phẩm từ backend");
  }

  const data = await res.json();
  return {
    products: data.content,
    totalProducts: data.totalElements,
    totalPages: data.totalPages,
    page: data.number + 1,
    size: data.size,
  };
}

export async function fetchProductBySlug(slug: string) {
  let headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (typeof window !== "undefined") {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  const res = await fetch(`http://localhost:8080/api/products/slug/${slug}`, {
    headers,
    cache: 'no-store',
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Lỗi khi lấy thông tin sản phẩm");
  }
  return await res.json();
}

export async function fetchRelatedProducts(categoryId: string, excludeId?: number) {
  let headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (typeof window !== "undefined") {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  const url = new URL(`http://localhost:8080/api/products/related/${categoryId}`);
  if (excludeId !== undefined && excludeId !== null) {
    url.searchParams.append('excludeId', excludeId.toString());
  }
  const res = await fetch(url.toString(), {
    headers,
    cache: 'no-store',
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Lỗi khi lấy sản phẩm liên quan");
  }
  return await res.json();
} 