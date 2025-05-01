"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 129.99,
        discountPrice: 99.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.5,
        reviews: 128,
        slug: "wireless-headphones",
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        discountPrice: null,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.2,
        reviews: 95,
        slug: "smart-watch",
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 79.99,
        discountPrice: 59.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 156,
        slug: "bluetooth-speaker",
    },
    {
        id: 4,
        name: "Laptop Backpack",
        price: 49.99,
        discountPrice: null,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.3,
        reviews: 87,
        slug: "laptop-backpack",
    },
    {
        id: 5,
        name: "Smartphone Case",
        price: 24.99,
        discountPrice: 19.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.1,
        reviews: 64,
        slug: "smartphone-case",
    },
    {
        id: 6,
        name: "Wireless Charger",
        price: 34.99,
        discountPrice: null,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.4,
        reviews: 112,
        slug: "wireless-charger",
    },
    {
        id: 7,
        name: "Digital Camera",
        price: 349.99,
        discountPrice: 299.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 73,
        slug: "digital-camera",
    },
    {
        id: 8,
        name: "Gaming Mouse",
        price: 59.99,
        discountPrice: 49.99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 189,
        slug: "gaming-mouse",
    },
]

export default function FeaturedProducts() {
    const [wishlist, setWishlist] = useState<number[]>([])

    const toggleWishlist = (productId: number) => {
        if (wishlist.includes(productId)) {
            setWishlist(wishlist.filter((id) => id !== productId))
        } else {
            setWishlist([...wishlist, productId])
        }
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                    <div className="relative">
                        <Link href={`/product/${product.slug}`}>
                            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-64 object-cover" />
                        </Link>
                        <button
                            onClick={() => toggleWishlist(product.id)}
                            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm"
                        >
                            <Heart
                                className={`h-5 w-5 ${wishlist.includes(product.id) ? "text-red-500 fill-red-500" : "text-gray-400"}`}
                            />
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
                                        <span className="text-lg font-bold text-gray-800">${product.discountPrice}</span>
                                        <span className="text-sm text-gray-500 line-through ml-2">${product.price}</span>
                                    </div>
                                ) : (
                                    <span className="text-lg font-bold text-gray-800">${product.price}</span>
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
