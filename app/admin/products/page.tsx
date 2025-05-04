"use client"

import React from "react"

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

function ProductForm({ initial, onSave, onClose, categories }: any) {
    const [form, setForm] = useState(initial || {
        name: "",
        slug: "",
        description: "",
        price: 0,
        discount_price: 0,
        image_url: "",
        stock_quantity: 0,
        category_id: "",
    })
    const [saving, setSaving] = useState(false)
    const isEdit = !!initial
    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setSaving(true)
        await onSave(form)
        setSaving(false)
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <form className="bg-white p-6 rounded shadow w-full max-w-lg" onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-4">{initial ? "Edit Product" : "Add Product"}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2" required />
                    <input name="slug" value={form.slug} onChange={handleChange} placeholder="Slug" className="border p-2" required />
                    <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="border p-2" required />
                    <input name="discount_price" value={form.discount_price} onChange={handleChange} placeholder="Discount Price" type="number" className="border p-2" />
                    <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="Image URL" className="border p-2" />
                    <input name="stock_quantity" value={form.stock_quantity} onChange={handleChange} placeholder="Stock Quantity" type="number" className="border p-2" />
                    <select name="category_id" value={form.category_id} onChange={handleChange} className="border p-2 col-span-2" required>
                        {!isEdit && <option value="">Chọn danh mục</option>}
                        {categories && categories.map((cat: any) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 w-full mt-2" />
                <div className="flex gap-2 mt-4 justify-end">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
                </div>
            </form>
        </div>
    )
}

function ProductDetail({ product, onClose }: any) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">Product Detail</h2>
                <div className="mb-2"><b>Name:</b> {product.name}</div>
                <div className="mb-2"><b>Slug:</b> {product.slug}</div>
                <div className="mb-2"><b>Price:</b> ${product.price}</div>
                <div className="mb-2"><b>Discount Price:</b> ${product.discount_price}</div>
                <div className="mb-2"><b>Stock:</b> {product.stock_quantity}</div>
                <div className="mb-2"><b>Description:</b> {product.description}</div>
                <div className="mb-2"><b>Image:</b> <img src={product.image_url} alt="img" className="h-24" /></div>
                <div className="flex gap-2 mt-4 justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-emerald-600 text-white rounded">Close</button>
                </div>
            </div>
        </div>
    )
}

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [showForm, setShowForm] = useState(false)
    const [editProduct, setEditProduct] = useState(null)
    const [showDetail, setShowDetail] = useState(null)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        setCurrentPage(1)
    }, [])

    useEffect(() => {
        fetchProducts()
    }, [currentPage, searchTerm])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories")
                if (response.ok) {
                    const data = await response.json()
                    setCategories(data)
                }
            } catch (error) {
                console.error("Error fetching categories:", error)
            }
        }
        fetchCategories()
    }, [])

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const response = await fetch(`/api/products?page=${currentPage}&search=${encodeURIComponent(searchTerm)}`)
            const data = await response.json()
            setProducts(data.content || [])
            setTotalPages(data.totalPages || 1)
        } catch (error) {
            console.error("Error fetching products:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleAdd = () => {
        setEditProduct(null)
        setShowForm(true)
    }

    const handleEdit = (product: any) => {
        if (!categories || categories.length === 0) {
            return
        }
        let categoryId = product.category_id
        const found = categories.find((cat: any) => String(cat.id) === String(product.category_id) || cat.slug === product.category_id)
        if (found) categoryId = found.id
        setEditProduct({ ...product, category_id: categoryId })
        setShowForm(true)
    }

    React.useEffect(() => {
        if (showForm && editProduct && categories && categories.length > 0) {
            let categoryId = editProduct.category_id
            const found = categories.find((cat: any) => String(cat.id) === String(editProduct.category_id) || cat.slug === editProduct.category_id)
            if (found && categoryId !== found.id) {
                setEditProduct({ ...editProduct, category_id: found.id })
            }
        }
    }, [categories])

    const handleDetail = (product: any) => {
        setShowDetail(product)
    }

    const handleSave = async (form: any) => {
        const token = localStorage.getItem("token")
        if (editProduct) {
            if (!form.category_id || isNaN(Number(form.category_id))) {
                alert("Vui lòng chọn danh mục hợp lệ!")
                return
            }
            const payload = { ...form, id: editProduct.id }
            const response = await fetch(`/api/products/${editProduct.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(payload),
            })
            if (!response.ok) {
                if (response.status === 404) {
                    alert("Sản phẩm không tồn tại hoặc đã bị xóa!")
                    setShowForm(false)
                    fetchProducts()
                    return
                }
                const errorData = await response.json()
                alert(errorData.message || "Failed to update product")
                return
            }
        } else {
            await fetch(`/api/products`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(form),
            })
        }
        setShowForm(false)
        fetchProducts()
    }

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            const token = localStorage.getItem("token")
            await fetch(`/api/products/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            })
            fetchProducts()
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
                                                    <button
                                                        onClick={() => handleDetail(product)}
                                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                                    >
                                                        Detail
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(product)}
                                                        className="text-yellow-600 hover:text-yellow-900 mr-4"
                                                    >
                                                        Edit
                                                    </button>
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

            {showForm && <ProductForm initial={editProduct} onSave={handleSave} onClose={() => setShowForm(false)} categories={categories} />}
            {showDetail && <ProductDetail product={showDetail} onClose={() => setShowDetail(null)} />}
        </div>
    )
}
