"use client"

import { useState } from "react"

interface AddToCartButtonProps {
    productId: number
    productName: string
    productPrice: number
    productImage: string
    maxQuantity: number
}

export default function AddToCartButton({
                                            productId,
                                            productName,
                                            productPrice,
                                            productImage,
                                            maxQuantity,
                                        }: AddToCartButtonProps) {
    const [quantity, setQuantity] = useState(1)
    const [isAdding, setIsAdding] = useState(false)

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const increaseQuantity = () => {
        if (quantity < maxQuantity) {
            setQuantity(quantity + 1)
        }
    }

    const handleAddToCart = () => {
        setIsAdding(true)

        // Simulate adding to cart
        setTimeout(() => {
            // Trong thực tế, bạn sẽ gọi API hoặc dispatch một action để thêm vào giỏ hàng
            console.log("Added to cart:", {
                productId,
                productName,
                productPrice,
                productImage,
                quantity,
            })

            // Hiển thị thông báo thành công (trong thực tế sẽ sử dụng toast notification)
            alert(`Added ${quantity} ${productName} to cart!`)
            setIsAdding(false)
        }, 500)
    }

    return (
        <div className="mt-6">
            <div className="flex items-center mb-4">
                <label htmlFor="quantity" className="mr-4 text-gray-700 font-medium">
                    Quantity:
                </label>
                <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                        type="button"
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                        className={`px-3 py-1 ${quantity <= 1 ? "text-gray-400" : "text-gray-600 hover:bg-gray-100"}`}
                    >
                        -
                    </button>
                    <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                    <button
                        type="button"
                        onClick={increaseQuantity}
                        disabled={quantity >= maxQuantity}
                        className={`px-3 py-1 ${quantity >= maxQuantity ? "text-gray-400" : "text-gray-600 hover:bg-gray-100"}`}
                    >
                        +
                    </button>
                </div>
                <span className="ml-4 text-sm text-gray-500">{maxQuantity} available</span>
            </div>

            <button
                onClick={handleAddToCart}
                disabled={isAdding || maxQuantity === 0}
                className={`w-full py-3 px-6 rounded-md font-medium text-white ${
                    maxQuantity === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : isAdding
                            ? "bg-emerald-600 opacity-75"
                            : "bg-emerald-600 hover:bg-emerald-700"
                } transition-colors`}
            >
                {maxQuantity === 0 ? "Out of Stock" : isAdding ? "Adding..." : "Add to Cart"}
            </button>
        </div>
    )
}
