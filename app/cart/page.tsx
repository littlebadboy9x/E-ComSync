"use client"

import { useState } from "react"
import Link from "next/link"
import { Trash2, ShoppingBag, CreditCard, ChevronRight } from "lucide-react"

// Mock cart data
const initialCartItems = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=100",
        slug: "wireless-headphones",
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=100",
        slug: "smart-watch",
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 59.99,
        quantity: 2,
        image: "/placeholder.svg?height=100&width=100",
        slug: "bluetooth-speaker",
    },
]

export default function CartPage() {
    const [cartItems, setCartItems] = useState(initialCartItems)

    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return

        setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }

    const removeItem = (id: number) => {
        setCartItems(cartItems.filter((item) => item.id !== id))
    }

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    const shipping = 10.0
    const tax = subtotal * 0.1 // 10% tax
    const total = subtotal + shipping + tax

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>

                {cartItems.length > 0 ? (
                    <div className="lg:flex lg:space-x-8">
                        {/* Cart Items */}
                        <div className="lg:w-2/3">
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Cart Items ({cartItems.length})</h2>

                                    <div className="space-y-6">
                                        {cartItems.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex flex-col sm:flex-row border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                                            >
                                                <div className="sm:w-24 sm:h-24 mb-4 sm:mb-0">
                                                    <img
                                                        src={item.image || "/placeholder.svg"}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover rounded-md"
                                                    />
                                                </div>
                                                <div className="flex-1 sm:ml-6">
                                                    <div className="flex flex-col sm:flex-row sm:justify-between">
                                                        <div>
                                                            <Link
                                                                href={`/products/${item.slug}`}
                                                                className="text-lg font-semibold text-gray-800 hover:text-emerald-600"
                                                            >
                                                                {item.name}
                                                            </Link>
                                                            <p className="text-gray-500 text-sm mt-1">Unit Price: ${item.price.toFixed(2)}</p>
                                                        </div>
                                                        <div className="mt-4 sm:mt-0">
                              <span className="font-semibold text-gray-800">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center mt-4">
                                                        <div className="flex items-center border border-gray-300 rounded-md">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="px-3 py-1 text-gray-800">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            className="text-red-500 hover:text-red-700 flex items-center"
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-1" />
                                                            <span>Remove</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Continue Shopping */}
                            <div className="flex justify-between items-center mb-8">
                                <Link
                                    href="/products"
                                    className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
                                >
                                    <ShoppingBag className="h-5 w-5 mr-2" />
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:w-1/3">
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-6">
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span className="text-gray-800 font-medium">${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Shipping</span>
                                            <span className="text-gray-800 font-medium">${shipping.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tax</span>
                                            <span className="text-gray-800 font-medium">${tax.toFixed(2)}</span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-4 mt-4">
                                            <div className="flex justify-between">
                                                <span className="text-gray-800 font-semibold">Total</span>
                                                <span className="text-emerald-600 font-bold">${total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        href="/checkout"
                                        className="w-full bg-emerald-500 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center hover:bg-emerald-600 transition duration-300"
                                    >
                                        <CreditCard className="mr-2 h-5 w-5" />
                                        Proceed to Checkout
                                    </Link>

                                    <div className="mt-6">
                                        <h3 className="text-sm font-semibold text-gray-800 mb-2">We Accept</h3>
                                        <div className="flex space-x-2">
                                            <div className="w-12 h-8 bg-gray-200 rounded"></div>
                                            <div className="w-12 h-8 bg-gray-200 rounded"></div>
                                            <div className="w-12 h-8 bg-gray-200 rounded"></div>
                                            <div className="w-12 h-8 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="h-12 w-12 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
                        <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
                        <Link
                            href="/products"
                            className="bg-emerald-500 text-white py-3 px-6 rounded-lg font-semibold inline-flex items-center hover:bg-emerald-600 transition duration-300"
                        >
                            Start Shopping
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
