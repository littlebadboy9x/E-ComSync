"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Product {
    id: number
    name: string
    price: number
    discount_price: number | null
    category_name: string
    stock_quantity: number
    created_at: string
}

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetchProducts()
    }, [currentPage, searchTerm])

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const response = await fetch(`/api/admin/products?page=${currentPage}&search=${encodeURIComponent(searchTerm)}`)
            const data = await response.json()
            setProducts(data.content || [])
            setTotalPages(data.totalPages || 1)
        } catch (error) {
            console.error("Error fetching products:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await fetch(`/api/admin/products/${id}`, {
                    method: "DELETE",
                })

                if (response.ok) {
                    // Refresh products list
                    fetchProducts()
                } else {
                    console.error("Failed to delete product")
                }
            } catch (error) {
                console.error("Error deleting product:", error)
            }
        }
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setCurrentPage(1) // Reset to first page on new search
        fetchProducts()
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
                <Link
                    href="/admin/products/new"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                    Add New Product
                </Link>
            </div>

            {/* Search */}
            <div className="mt-6">
                <form onSubmit={handleSearch} className="flex w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-l-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
                    />
                    <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-r-md">
                        Search
                    </button>
                </form>
            </div>

            {/* Products Table */}
            <div className="mt-8 flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            {loading ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                                </div>
                            ) : (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Product
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Category
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Price
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Stock
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Created At
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {products.length > 0 ? (
                                        products.map((product) => (
                                            <tr key={product.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md"></div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category_name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {product.discount_price ? (
                                                        <div>
                                                            <span className="text-sm text-gray-900">${product.discount_price.toFixed(2)}</span>
                                                            <span className="ml-2 text-xs text-gray-500 line-through">
                                  ${product.price.toFixed(2)}
                                </span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-gray-900">${product.price.toFixed(2)}</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {product.stock_quantity}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(product.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link
                                                        href={`/admin/products/${product.id}`}
                                                        className="text-emerald-600 hover:text-emerald-900 mr-4"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                                No products found
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-4 flex justify-center">
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                                currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50 cursor-pointer"
                            }`}
                        >
                            <span className="sr-only">Previous</span>
                            <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                                    currentPage === i + 1
                                        ? "z-10 bg-emerald-50 border-emerald-500 text-emerald-600"
                                        : "text-gray-500 hover:bg-gray-50"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                                currentPage === totalPages
                                    ? "text-gray-300 cursor-not-allowed"
                                    : "text-gray-500 hover:bg-gray-50 cursor-pointer"
                            }`}
                        >
                            <span className="sr-only">Next</span>
                            <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </nav>
                </div>
            )}
        </div>
    )
}
