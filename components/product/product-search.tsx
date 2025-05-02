"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"

interface ProductSearchProps {
    defaultValue?: string
}

export default function ProductSearch({ defaultValue = "" }: ProductSearchProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [searchTerm, setSearchTerm] = useState(defaultValue)

    const handleSearch = (e) => {
        e.preventDefault()

        // Create new URLSearchParams object
        const params = new URLSearchParams(searchParams.toString())

        // Update or remove search parameter
        if (searchTerm) {
            params.set("search", searchTerm)
        } else {
            params.delete("search")
        }

        // Reset to page 1 when searching
        params.set("page", "1")

        // Navigate with updated params
        router.push(`/products?${params.toString()}`)
    }

    return (
        <form onSubmit={handleSearch} className="relative w-full md:w-80">
            <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <button type="submit" className="absolute left-3 top-2.5 text-gray-400 hover:text-emerald-500">
                <Search className="h-5 w-5" />
            </button>
        </form>
    )
}
