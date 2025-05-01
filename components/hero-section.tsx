import Link from "next/link"

export default function HeroSection() {
    return (
        <section className="bg-gradient-to-r from-emerald-500 to-teal-600 py-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 text-white mb-10 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop Smarter, Not Harder</h1>
                        <p className="text-xl mb-8">
                            Discover the best products at the best prices with our AI-powered recommendations.
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                href="/products"
                                className="bg-white text-emerald-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
                            >
                                Shop Now
                            </Link>
                            <Link
                                href="/deals"
                                className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-emerald-600 transition duration-300"
                            >
                                View Deals
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <img
                            src="/placeholder.svg?height=400&width=600"
                            alt="Shopping Experience"
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
