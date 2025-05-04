"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Category {
    id: number
    name: string
    slug: string
}

interface ProductFormData {
    name: string
    slug: string
    description: string
    price: number
    discount_price: number | null
    image_url: string
    stock_quantity: number
    category_id: number | string
}

export default function ProductForm({ params }: { params: { id: string } }) {
    const router = useRouter()
    const isNew = params.id === "new"
    const productId = isNew ? null : Number(params.id)

    const [formData, setFormData] = useState<ProductFormData>({
        name: "",
        slug: "",
        description: "",
        price: 0,
        discount_price: null,
        image_url: "",
        stock_quantity: 0,
        category_id: "",
    })

    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")

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

        const fetchProduct = async () => {
            if (!isNew && productId) {
                try {
                    const response = await fetch(`/api/products/${productId}`)
                    if (response.ok) {
                        const data = await response.json()
                        setFormData({
                            name: data.name,
                            slug: data.slug,
                            description: data.description || "",
                            price: data.price,
                            discount_price: data.discount_price,
                            image_url: data.image_url || "",
                            stock_quantity: data.stock_quantity || 0,
                            category_id: data.category_id || "",
                        })
                    }
                } catch (error) {
                    console.error("Error fetching product:", error)
                    setError("Failed to load product data")
                }
            }
            setLoading(false)
        }

        fetchCategories()
        fetchProduct()
    }, [isNew, productId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target

        // Handle number inputs
        if (type === "number") {
            setFormData({
                ...formData,
                [name]: value === "" ? "" : Number(value),
            })
        } else if (name === "category_id") {
            // Ensure category_id is a number
            setFormData({
                ...formData,
                [name]: value === "" ? "" : Number(value),
            })
        } else {
            setFormData({
                ...formData,
                [name]: value,
            })
        }
    }

    const generateSlug = () => {
        const slug = formData.name
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim()

        setFormData({
            ...formData,
            slug,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setError("")

        try {
            const url = isNew ? "/api/products" : `/api/products/${productId}`
            const method = isNew ? "POST" : "PUT"

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Failed to save product")
            }

            router.push("/admin/products")
        } catch (err: any) {
            setError(err.message || "An error occurred while saving the product")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900">{isNew ? "Add New Product" : "Edit Product"}</h1>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-5 w-5 text-red-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Product Name
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={() => !formData.slug && generateSlug()}
                                required
                                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                            Slug
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                                type="text"
                                name="slug"
                                id="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                required
                                className="flex-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full min-w-0 rounded-none rounded-l-md sm:text-sm border-gray-300"
                            />
                            <button
                                type="button"
                                onClick={generateSlug}
                                className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
                            >
                                Generate
                            </button>
                        </div>
                    </div>

                    <div className="sm:col-span-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <div className="mt-1">
              <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border border-gray-300 rounded-md"
              />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            Price
                        </label>
                        <div className="mt-1">
                            <input
                                type="number"
                                name="price"
                                id="price"
                                min="0"
                                step="0.01"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="discount_price" className="block text-sm font-medium text-gray-700">
                            Discount Price (Optional)
                        </label>
                        <div className="mt-1">
                            <input
                                type="number"
                                name="discount_price"
                                id="discount_price"
                                min="0"
                                step="0.01"
                                value={formData.discount_price === null ? "" : formData.discount_price}
                                onChange={handleChange}
                                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="stock_quantity" className="block text-sm font-medium text-gray-700">
                            Stock Quantity
                        </label>
                        <div className="mt-1">
                            <input
                                type="number"
                                name="stock_quantity"
                                id="stock_quantity"
                                min="0"
                                value={formData.stock_quantity}
                                onChange={handleChange}
                                required
                                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <div className="mt-1">
                            <select
                                id="category_id"
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleChange}
                                required
                                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="sm:col-span-6">
                        <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
                            Image URL
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="image_url"
                                id="image_url"
                                value={formData.image_url}
                                onChange={handleChange}
                                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-5">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => router.push("/admin/products")}
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                        >
                            {saving ? "Saving..." : isNew ? "Create Product" : "Update Product"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
