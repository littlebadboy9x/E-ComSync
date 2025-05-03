import Link from "next/link"

interface RelatedProduct {
    id: number
    name: string
    slug: string
    price: number
    discount_price: number | null
    image_url: string
    rating: number
    reviews: number
}

interface RelatedProductsProps {
    products: RelatedProduct[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
    return (
        <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <Link href={`/products/${product.slug}`}>
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={product.image_url || "/placeholder.svg?height=300&width=300"}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </Link>
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
                                    {product.discount_price ? (
                                        <div className="flex items-center">
                                            <span className="text-lg font-bold text-gray-800">${product.discount_price}</span>
                                            <span className="text-sm text-gray-500 line-through ml-2">${product.price}</span>
                                        </div>
                                    ) : (
                                        <span className="text-lg font-bold text-gray-800">${product.price}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
