"use client"

import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"
import { useEffect, useState } from "react"
import { fetchProducts } from "@/lib/fetchProducts"

export default function FeaturedProducts() {
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await fetchProducts({ 
                    sort: ["id", "desc"], 
                    page: 0,
                    size: 8
                })
                setProducts(data.content || [])
            } catch (err) {
                console.error('Error loading featured products:', err)
                setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải sản phẩm')
            } finally {
                setLoading(false)
            }
        }

        loadProducts()
    }, [])

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
                        <div className="h-64 bg-gray-200"></div>
                        <div className="p-4">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <div className="text-red-500 mb-2">{error}</div>
                <button
                    onClick={() => window.location.reload()}
                    className="text-primary-600 hover:text-primary-700"
                >
                    Thử lại
                </button>
            </div>
        )
    }

    if (!products.length) {
        return <div className="text-center py-8 text-gray-500">Không có sản phẩm nổi bật</div>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                    <div className="relative">
                        <Link href={`/products/${product.slug}`}>
                            <img
                                src={
                                    (product.images && product.images.length > 0 && product.images[0]) ||
                                    product.image_url ||
                                    product.imageUrl ||
                                    product.image ||
                                    "/placeholder.svg"
                                }
                                alt={product.name}
                                className="w-full h-64 object-cover"
                            />
                        </Link>
                        <button
                            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm"
                        >
                            <Heart className="h-5 w-5 text-gray-400" />
                        </button>
                        {product.discountPrice && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
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
                                        className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? "fill-current" : "fill-gray-300"}`}
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-xs text-gray-500 ml-1">({product.reviews || 0})</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                {product.discountPrice ? (
                                    <div className="flex items-center">
                                        <span className="text-lg font-bold text-gray-800">{product.discountPrice}</span>
                                        <span className="text-sm text-gray-500 line-through ml-2">{product.price}</span>
                                    </div>
                                ) : (
                                    <span className="text-lg font-bold text-gray-800">{product.price}</span>
                                )}
                            </div>
                            <button className="p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors duration-300">
                                <ShoppingCart className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
