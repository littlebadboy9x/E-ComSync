"use client"

import { useRouter, useSearchParams } from "next/navigation"

interface ProductPaginationProps {
    currentPage: number
    totalPages: number
}

export default function ProductPagination({ currentPage, totalPages }: ProductPaginationProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handlePageChange = (page: number) => {
        // Create new URLSearchParams object
        const params = new URLSearchParams(searchParams.toString())

        // Update page parameter
        params.set("page", page.toString())

        // Navigate with updated params
        router.push(`/products?${params.toString()}`)
    }

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = []

        // Always show first page
        pages.push(1)

        // Calculate range around current page
        const rangeStart = Math.max(2, currentPage - 1)
        const rangeEnd = Math.min(totalPages - 1, currentPage + 1)

        // Add ellipsis after first page if needed
        if (rangeStart > 2) {
            pages.push("ellipsis-start")
        }

        // Add pages in range
        for (let i = rangeStart; i <= rangeEnd; i++) {
            pages.push(i)
        }

        // Add ellipsis before last page if needed
        if (rangeEnd < totalPages - 1) {
            pages.push("ellipsis-end")
        }

        // Always show last page if more than 1 page
        if (totalPages > 1) {
            pages.push(totalPages)
        }

        return pages
    }

    if (totalPages <= 1) {
        return null
    }

    return (
        <div className="flex justify-center items-center space-x-2">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-md border ${
                    currentPage === 1
                        ? "border-gray-200 text-gray-400 cursor-not-allowed"
                        : "border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m15 18-6-6 6-6" />
                </svg>
            </button>

            {getPageNumbers().map((page, index) => {
                if (page === "ellipsis-start" || page === "ellipsis-end") {
                    return (
                        <span key={`${page}-${index}`} className="px-2">
              ...
            </span>
                    )
                }

                return (
                    <button
                        key={`page-${page}`}
                        onClick={() => handlePageChange(Number(page))}
                        className={`px-3 py-1 rounded-md ${
                            currentPage === page
                                ? "bg-emerald-500 text-white"
                                : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        {page}
                    </button>
                )
            })}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-md border ${
                    currentPage === totalPages
                        ? "border-gray-200 text-gray-400 cursor-not-allowed"
                        : "border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m9 18 6-6-6-6" />
                </svg>
            </button>
        </div>
    )
}
