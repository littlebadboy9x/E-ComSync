"use client"
import Link from "next/link"
import { ShoppingCart, Search, User, Menu } from "lucide-react"
import FeaturedProducts from "@/components/featured-products"
import CategoryList from "@/components/category-list"
import HeroSection from "@/components/hero-section"
import ChatbotButton from "@/components/chatbot-button"
import { Suspense, useEffect, useState } from "react"
import { getCurrentUser } from "@/lib/auth"

export default function HomePage() {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }
        const loadUser = async () => {
            try {
                const userData = await getCurrentUser()
                setUser(userData)
            } catch (error) {
                // Nếu token hết hạn thì xóa token
                localStorage.removeItem('token');
            } finally {
                setLoading(false)
            }
        }
        loadUser()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/" className="text-2xl font-bold text-primary-600">
                                E-ComSync
                            </Link>
                            <nav className="hidden ml-10 space-x-8 md:flex">
                                <Link href="/products" className="text-gray-600 hover:text-primary-600">
                                    Sản phẩm
                                </Link>
                                <Link href="/categories" className="text-gray-600 hover:text-primary-600">
                                    Danh mục
                                </Link>
                                <Link href="/deals" className="text-gray-600 hover:text-primary-600">
                                    Ưu đãi
                                </Link>
                                <Link href="/about" className="text-gray-600 hover:text-primary-600">
                                    Giới thiệu
                                </Link>
                            </nav>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative hidden md:block">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm sản phẩm..."
                                    className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                            <Link href="/cart" className="relative p-2">
                                <ShoppingCart className="h-6 w-6 text-gray-600" />
                                <span className="absolute top-0 right-0 h-5 w-5 text-xs flex items-center justify-center bg-primary-500 text-white rounded-full">
                                    0
                                </span>
                            </Link>
                            {loading ? (
                                <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                            ) : user ? (
                                <Link href="/account" className="p-2">
                                    <User className="h-6 w-6 text-gray-600" />
                                </Link>
                            ) : (
                                <Link href="/login" className="p-2">
                                    <User className="h-6 w-6 text-gray-600" />
                                </Link>
                            )}
                            <button className="md:hidden p-2">
                                <Menu className="h-6 w-6 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4">
                {/* Hero Section */}
                <Suspense fallback={<div className="h-96 bg-gray-200 animate-pulse rounded-lg"></div>}>
                    <HeroSection />
                </Suspense>

                {/* Categories */}
                <section className="py-12 bg-white rounded-lg shadow-sm mt-8">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">Mua sắm theo danh mục</h2>
                        <Suspense fallback={<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-lg"></div>
                            ))}
                        </div>}>
                            <CategoryList />
                        </Suspense>
                    </div>
                </section>

                {/* Featured Products */}
                <section className="py-12 bg-gray-50 rounded-lg shadow-sm mt-8">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">Sản phẩm nổi bật</h2>
                        <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
                                    <div className="h-64 bg-gray-200"></div>
                                    <div className="p-4">
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>}>
                            <FeaturedProducts />
                        </Suspense>
                    </div>
                </section>

                {/* Special Offers */}
                <section className="py-12 bg-white rounded-lg shadow-sm mt-8">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">Ưu đãi đặc biệt</h2>
                        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-8 text-white">
                            <div className="md:flex items-center justify-between">
                                <div className="mb-6 md:mb-0">
                                    <h3 className="text-2xl font-bold mb-2">Khuyến mãi mùa hè</h3>
                                    <p className="text-lg mb-4">Giảm giá lên đến 40% cho các sản phẩm được chọn</p>
                                    <Link
                                        href="/deals"
                                        className="inline-block bg-white text-primary-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
                                    >
                                        Mua ngay
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
            <footer className="bg-gray-800 text-white py-12 mt-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">E-ComSync</h3>
                            <p className="text-gray-300">Your one-stop shop for all your needs.</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Liên kết nhanh</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/about" className="text-gray-300 hover:text-white">
                                        Về chúng tôi
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-gray-300 hover:text-white">
                                        Liên hệ
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/faq" className="text-gray-300 hover:text-white">
                                        Câu hỏi thường gặp
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="text-gray-300 hover:text-white">
                                        Điều khoản & Điều kiện
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Danh mục</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/category/electronics" className="text-gray-300 hover:text-white">
                                        Điện tử
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/category/clothing" className="text-gray-300 hover:text-white">
                                        Thời trang
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/category/home" className="text-gray-300 hover:text-white">
                                        Nhà cửa & Vườn
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/category/beauty" className="text-gray-300 hover:text-white">
                                        Làm đẹp & Sức khỏe
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Kết nối với chúng tôi</h4>
                            <p className="text-gray-300 mb-4">Đăng ký nhận bản tin để cập nhật</p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Email của bạn"
                                    className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-800"
                                />
                                <button className="bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded-r-md">Đăng ký</button>
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
