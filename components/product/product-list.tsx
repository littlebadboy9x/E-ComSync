import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"
import ProductPagination from "./product-pagination"
import { fetchProducts } from "@/lib/fetchProducts"

interface ProductListProps {
    search?: string
    category?: string
    sort?: string
    page?: number
    minPrice?: number
    maxPrice?: number
}

export default async function ProductList({
    search = "",
    category = "",
    sort = "featured",
    page = 1,
    minPrice,
    maxPrice,
}: ProductListProps) {
    // Đảm bảo fetchProducts gọi API backend thực sự
    const { products, totalProducts, totalPages } = await fetchProducts({
        search,
        category,
        sort,
        page,
        minPrice,
        maxPrice,
    })

    if (!Array.isArray(products) || products.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Không tìm thấy sản phẩm nào</h3>
                <p className="text-gray-600">Hãy thử thay đổi từ khóa hoặc bộ lọc</p>
            </div>
        )
    }

    return (
        <div>
            <div className="mb-4 text-sm text-gray-600">
                Hiển thị {products.length} trên tổng {totalProducts} sản phẩm
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <div className="mt-8">
                <ProductPagination currentPage={page} totalPages={totalPages} />
            </div>
        </div>
    )
}

function formatVND(amount: number) {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}

function ProductCard({ product }) {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="relative">
                <Link href={`/products/${product.slug}`}>
                    <img
                        src={
                            (product.images && product.images.length > 0 && product.images[0]) ||
                            product.image_url ||
                            product.imageUrl ||
                            "/placeholder.svg?height=300&width=300"
                        }
                        alt={product.name}
                        className="w-full h-64 object-cover"
                    />
                </Link>
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm">
                    <Heart className="h-5 w-5 text-gray-400" />
                </button>
                {product.discountPrice && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        GIẢM {Math.round((1 - product.discountPrice / product.price) * 100)}%
                    </div>
                )}
            </div>
            <div className="p-4">
                <Link href={`/products/${product.slug}`} className="block">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                </Link>
                <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : "fill-gray-300"}`}
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        {product.discountPrice ? (
                            <div className="flex items-center">
                                <span className="text-lg font-bold text-gray-800">{formatVND(product.discountPrice)}</span>
                                <span className="text-sm text-gray-500 line-through ml-2">{formatVND(product.price)}</span>
                            </div>
                        ) : (
                            <span className="text-lg font-bold text-gray-800">{formatVND(product.price)}</span>
                        )}
                    </div>
                    <button className="p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors duration-300">
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
