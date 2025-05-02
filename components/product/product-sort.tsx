"use client"

import { useRouter, useSearchParams } from "next/navigation"

interface ProductSortProps {
    defaultValue?: string
}

export default function ProductSort({ defaultValue = "featured" }: ProductSortProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleSortChange = (e) => {
        const value = e.target.value

        // Create new URLSearchParams object
        const params = new URLSearchParams(searchParams.toString())

        // Update sort parameter
        params.set("sort", value)

        // Reset to page 1 when changing sort
        params.set("page", "1")

        // Navigate with updated params
        router.push(`/products?${params.toString()}`)
    }

    return (
        <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sắp xếp:</span>
            <select
                value={defaultValue}
                onChange={handleSortChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
                <option value="featured">Nổi bật</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="newest">Mới nhất</option>
                <option value="rating">Đánh giá cao nhất</option>
            </select>
        </div>
    )
}
