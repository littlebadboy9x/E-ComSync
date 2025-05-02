"use client"

import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"
import { useEffect, useState } from "react"
import { fetchProducts } from "@/lib/fetchProducts"

export default function FeaturedProducts() {
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProducts({ sort: "featured", page: 1 })
            .then((data) => setProducts(data.products || []))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <div className="text-center py-8">Đang tải sản phẩm nổi bật...</div>
    }

    if (!products.length) {
        return <div className="text-center py-8 text-gray-500">Không có sản phẩm nổi bật</div>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
                <div
                    key={product.id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                    <div className="relative">
                        <Link href={`/product/${product.slug}`}>
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
                        <Link href={`/product/${product.slug}`} className="block">
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
