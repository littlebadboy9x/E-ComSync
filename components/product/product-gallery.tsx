"use client"

import { useState } from "react"

interface ProductGalleryProps {
    images: string[]
    productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [mainImage, setMainImage] = useState(images[0])

    // Nếu không có hình ảnh, sử dụng placeholder
    if (images.length === 0) {
        images = ["/placeholder.svg?height=600&width=600"]
    }

    return (
        <div className="flex flex-col">
            {/* Main Image */}
            <div className="mb-4 overflow-hidden rounded-lg bg-gray-100">
                <img
                    src={mainImage || "/placeholder.svg"}
                    alt={productName}
                    className="h-full w-full object-cover object-center"
                    style={{ aspectRatio: "1/1" }}
                />
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
                <div className="flex space-x-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setMainImage(image)}
                            className={`relative h-20 w-20 overflow-hidden rounded-md border-2 ${
                                mainImage === image ? "border-emerald-500" : "border-gray-200"
                            }`}
                        >
                            <img
                                src={image || "/placeholder.svg"}
                                alt={`${productName} thumbnail ${index + 1}`}
                                className="h-full w-full object-cover object-center"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
