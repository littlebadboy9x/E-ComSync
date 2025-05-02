export async function fetchProducts(params: any) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`http://localhost:8080/api/products?${query}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error("Lỗi khi lấy dữ liệu sản phẩm từ backend");
  return await res.json();
} 