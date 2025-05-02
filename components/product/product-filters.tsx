"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const categories = [
    { id: "electronics", name: "Điện tử" },
    { id: "clothing", name: "Thời trang" },
    { id: "home-garden", name: "Nhà cửa & Vườn" },
    { id: "sports", name: "Thể thao" },
]

interface ProductFiltersProps {
    selectedCategory?: string
    minPrice?: number
    maxPrice?: number
}

export default function ProductFilters({ selectedCategory = "", minPrice = 0, maxPrice = 1000 }: ProductFiltersProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [priceRange, setPriceRange] = useState<[number, number]>([minPrice || 0, maxPrice || 1000])
    const [category, setCategory] = useState<string>(selectedCategory)

    const handleApplyFilters = () => {
        // Create new URLSearchParams object
        const params = new URLSearchParams(searchParams.toString())

        // Update category parameter
        if (category) {
            params.set("category", category)
        } else {
            params.delete("category")
        }

        // Update price range parameters
        if (priceRange[0] > 0) {
            params.set("minPrice", priceRange[0].toString())
        } else {
            params.delete("minPrice")
        }

        if (priceRange[1] < 1000) {
            params.set("maxPrice", priceRange[1].toString())
        } else {
            params.delete("maxPrice")
        }

        // Reset to page 1 when filtering
        params.set("page", "1")

        // Navigate with updated params
        router.push(`/products?${params.toString()}`)
    }

    const handleResetFilters = () => {
        setCategory("")
        setPriceRange([0, 1000])

        // Create new URLSearchParams object keeping only search and sort
        const params = new URLSearchParams()
        const search = searchParams.get("search")
        const sort = searchParams.get("sort")

        if (search) params.set("search", search)
        if (sort) params.set("sort", sort)

        // Reset to page 1
        params.set("page", "1")

        // Navigate with updated params
        router.push(`/products?${params.toString()}`)
    }

    const handlePriceChange = (index, value) => {
        const newPriceRange = [...priceRange]
        newPriceRange[index] = value
        setPriceRange(newPriceRange as [number, number])
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Bộ lọc</h3>

            {/* Categories */}
            <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Danh mục</h4>
                <div className="space-y-2">
                    {categories.map((cat) => (
                        <div key={cat.id} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`category-${cat.id}`}
                                checked={category === cat.id}
                                onChange={() => setCategory(category === cat.id ? "" : cat.id)}
                                className="rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                            />
                            <label htmlFor={`category-${cat.id}`} className="ml-2 text-sm text-gray-600 cursor-pointer">
                                {cat.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="my-4 border-gray-200" />

            {/* Price Range */}
            <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Khoảng giá</h4>
                <div className="px-2">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <label htmlFor="min-price" className="block text-sm text-gray-600 mb-1">
                                Giá thấp nhất
                            </label>
                            <input
                                type="number"
                                id="min-price"
                                min="0"
                                max="1000"
                                value={priceRange[0]}
                                onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                                className="w-24 border border-gray-300 rounded px-2 py-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="max-price" className="block text-sm text-gray-600 mb-1">
                                Giá cao nhất
                            </label>
                            <input
                                type="number"
                                id="max-price"
                                min="0"
                                max="1000"
                                value={priceRange[1]}
                                onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                                className="w-24 border border-gray-300 rounded px-2 py-1"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <hr className="my-4 border-gray-200" />

            {/* Action Buttons */}
            <div className="flex flex-col space-y-2">
                <button
                    onClick={handleApplyFilters}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
                >
                    Áp dụng bộ lọc
                </button>
                <button
                    onClick={handleResetFilters}
                    className="w-full border border-gray-300 text-gray-600 hover:bg-gray-100 py-2 px-4 rounded-md transition-colors duration-300"
                >
                    Đặt lại bộ lọc
                </button>
            </div>
        </div>
    )
}
