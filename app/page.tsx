import Link from "next/link"
import { ShoppingCart, Search, User, Menu } from "lucide-react"
import FeaturedProducts from "@/components/featured-products"
import CategoryList from "@/components/category-list"
import HeroSection from "@/components/hero-section"
import ChatbotButton from "@/components/chatbot-button"

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/" className="text-2xl font-bold text-primary-600">
                                E-ComSync
                            </Link>
                            <nav className="hidden ml-10 space-x-8 md:flex">
                                <Link href="/products" className="text-gray-600 hover:text-primary-600">
                                    Products
                                </Link>
                                <Link href="/categories" className="text-gray-600 hover:text-primary-600">
                                    Categories
                                </Link>
                                <Link href="/deals" className="text-gray-600 hover:text-primary-600">
                                    Deals
                                </Link>
                                <Link href="/about" className="text-gray-600 hover:text-primary-600">
                                    About
                                </Link>
                            </nav>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative hidden md:block">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                            <Link href="/cart" className="relative p-2">
                                <ShoppingCart className="h-6 w-6 text-gray-600" />
                                <span className="absolute top-0 right-0 h-5 w-5 text-xs flex items-center justify-center bg-primary-500 text-white rounded-full">
                                    3
                                </span>
                            </Link>
                            <Link href="/account" className="p-2">
                                <User className="h-6 w-6 text-gray-600" />
                            </Link>
                            <button className="md:hidden p-2">
                                <Menu className="h-6 w-6 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <HeroSection />

                {/* Categories */}
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">Shop by Category</h2>
                        <CategoryList />
                    </div>
                </section>

                {/* Featured Products */}
                <section className="py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Products</h2>
                        <FeaturedProducts />
                    </div>
                </section>

                {/* Special Offers */}
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">Special Offers</h2>
                        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-8 text-white">
                            <div className="md:flex items-center justify-between">
                                <div className="mb-6 md:mb-0">
                                    <h3 className="text-2xl font-bold mb-2">Summer Sale</h3>
                                    <p className="text-lg mb-4">Get up to 40% off on selected items</p>
                                    <Link
                                        href="/deals"
                                        className="inline-block bg-white text-primary-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
                                    >
                                        Shop Now
                                    </Link>
                                </div>
                                <div className="w-full md:w-1/3">
                                    <img
                                        src="/placeholder.svg?height=200&width=300"
                                        alt="Summer Sale"
                                        className="rounded-lg w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">E-ComSync</h3>
                            <p className="text-gray-300">Your one-stop shop for all your needs.</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/about" className="text-gray-300 hover:text-white">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-gray-300 hover:text-white">
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/faq" className="text-gray-300 hover:text-white">
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="text-gray-300 hover:text-white">
                                        Terms & Conditions
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Categories</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/category/electronics" className="text-gray-300 hover:text-white">
                                        Electronics
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/category/clothing" className="text-gray-300 hover:text-white">
                                        Clothing
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/category/home" className="text-gray-300 hover:text-white">
                                        Home & Garden
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/category/beauty" className="text-gray-300 hover:text-white">
                                        Beauty & Health
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
                            <p className="text-gray-300 mb-4">Subscribe to our newsletter for updates</p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-800"
                                />
                                <button className="bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded-r-md">Subscribe</button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                        <p>&copy; {new Date().getFullYear()} E-ComSync. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Chatbot Button */}
            <ChatbotButton />
        </div>
    )
}
