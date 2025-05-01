import Link from "next/link"
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, RotateCcw } from "lucide-react"

// This would normally come from an API or database
const product = {
    id: 1,
    name: "Wireless Noise Cancelling Headphones",
    slug: "wireless-headphones",
    price: 129.99,
    discountPrice: 99.99,
    rating: 4.5,
    reviews: 128,
    description:
        "Experience premium sound quality with our wireless noise cancelling headphones. Perfect for music lovers and professionals alike, these headphones deliver crystal clear audio and exceptional comfort for all-day wear.",
    features: [
        "Active Noise Cancellation",
        "Bluetooth 5.0 Connectivity",
        "30-hour Battery Life",
        "Comfortable Over-ear Design",
        "Built-in Microphone for Calls",
        "Quick Charge Technology",
    ],
    specifications: {
        Brand: "E-ComSync Audio",
        Model: "NC-500",
        Color: "Matte Black",
        Connectivity: "Bluetooth 5.0, 3.5mm Audio Jack",
        Battery: "500mAh, Up to 30 hours",
        Weight: "250g",
    },
    images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
    ],
    stock: 15,
    categories: ["Electronics", "Audio", "Headphones"],
}

export default function ProductPage({ params }: { params: { slug: string } }) {
    // In a real app, you would fetch the product data based on the slug

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white py-4 shadow-sm">
                <div className="container mx-auto px-4">
                    <nav className="text-sm">
                        <ol className="flex items-center space-x-2">
                            <li>
                                <Link href="/" className="text-gray-500 hover:text-emerald-600">
                                    Home
                                </Link>
                            </li>
                            <li className="text-gray-500">/</li>
                            <li>
                                <Link href="/category/electronics" className="text-gray-500 hover:text-emerald-600">
                                    Electronics
                                </Link>
                            </li>
                            <li className="text-gray-500">/</li>
                            <li>
                                <Link href="/category/headphones" className="text-gray-500 hover:text-emerald-600">
                                    Headphones
                                </Link>
                            </li>
                            <li className="text-gray-500">/</li>
                            <li className="text-emerald-600 font-medium">{product.name}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Product Details */}
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="md:flex">
                        {/* Product Images */}
                        <div className="md:w-1/2 p-6">
                            <div className="mb-4">
                                <img
                                    src={product.images[0] || "/placeholder.svg"}
                                    alt={product.name}
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {product.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-emerald-500 cursor-pointer"
                                    >
                                        <img
                                            src={image || "/placeholder.svg"}
                                            alt={`${product.name} - View ${index + 1}`}
                                            className="w-full h-auto"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="md:w-1/2 p-6 border-t md:border-t-0 md:border-l border-gray-200">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>

                            {/* Rating */}
                            <div className="flex items-center mb-4">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-current" : ""}`} />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600 ml-2">
                  {product.rating} ({product.reviews} reviews)
                </span>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                {product.discountPrice ? (
                                    <div className="flex items-center">
                                        <span className="text-3xl font-bold text-gray-800">${product.discountPrice}</span>
                                        <span className="text-xl text-gray-500 line-through ml-3">${product.price}</span>
                                        <span className="ml-3 bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-semibold">
                      {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                    </span>
                                    </div>
                                ) : (
                                    <span className="text-3xl font-bold text-gray-800">${product.price}</span>
                                )}
                            </div>

                            {/* Stock */}
                            <div className="mb-6">
                <span className={`text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
                </span>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <p className="text-gray-600">{product.description}</p>
                            </div>

                            {/* Actions */}
                            <div className="mb-6 space-y-3">
                                <button className="w-full bg-emerald-500 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center hover:bg-emerald-600 transition duration-300">
                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                    Add to Cart
                                </button>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold flex items-center justify-center hover:bg-gray-50 transition duration-300">
                                        <Heart className="mr-2 h-5 w-5" />
                                        Wishlist
                                    </button>
                                    <button className="border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold flex items-center justify-center hover:bg-gray-50 transition duration-300">
                                        <Share2 className="mr-2 h-5 w-5" />
                                        Share
                                    </button>
                                </div>
                            </div>

                            {/* Benefits */}
                            <div className="border-t border-gray-200 pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="flex items-center">
                                        <Truck className="h-5 w-5 text-emerald-500 mr-2" />
                                        <span className="text-sm text-gray-600">Free Shipping</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Shield className="h-5 w-5 text-emerald-500 mr-2" />
                                        <span className="text-sm text-gray-600">2 Year Warranty</span>
                                    </div>
                                    <div className="flex items-center">
                                        <RotateCcw className="h-5 w-5 text-emerald-500 mr-2" />
                                        <span className="text-sm text-gray-600">30-Day Returns</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Details Tabs */}
                    <div className="border-t border-gray-200">
                        <div className="container mx-auto px-6 py-8">
                            <div className="mb-6 border-b border-gray-200">
                                <div className="flex overflow-x-auto">
                                    <button className="px-6 py-3 text-emerald-600 border-b-2 border-emerald-500 font-medium">
                                        Features
                                    </button>
                                    <button className="px-6 py-3 text-gray-500 font-medium">Specifications</button>
                                    <button className="px-6 py-3 text-gray-500 font-medium">Reviews</button>
                                    <button className="px-6 py-3 text-gray-500 font-medium">FAQs</button>
                                </div>
                            </div>

                            {/* Features Content */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Key Features</h3>
                                <ul className="space-y-2">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center mt-1">
                                                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="ml-3 text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">You May Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/* This would be a component showing related products */}
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="p-4">
                                    <img
                                        src="/placeholder.svg?height=200&width=200"
                                        alt="Related Product"
                                        className="w-full h-48 object-cover rounded-md mb-4"
                                    />
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Related Product {item}</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-gray-800">$89.99</span>
                                        <button className="p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors duration-300">
                                            <ShoppingCart className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
