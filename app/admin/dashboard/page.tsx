"use client"

import { useState, useEffect } from "react"

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalRevenue: 0,
    })
    const [recentOrders, setRecentOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Trong thực tế, bạn sẽ gọi API để lấy dữ liệu
                // Ở đây chúng ta sẽ sử dụng dữ liệu mẫu
                setTimeout(() => {
                    setStats({
                        totalProducts: 152,
                        totalOrders: 87,
                        totalUsers: 543,
                        totalRevenue: 15680.42,
                    })
                    setRecentOrders([
                        {
                            id: 1,
                            orderNumber: "ORD-2023-001",
                            customer: "John Doe",
                            date: "2023-11-15",
                            status: "Completed",
                            total: 129.99,
                        },
                        {
                            id: 2,
                            orderNumber: "ORD-2023-002",
                            customer: "Jane Smith",
                            date: "2023-11-14",
                            status: "Processing",
                            total: 259.98,
                        },
                        {
                            id: 3,
                            orderNumber: "ORD-2023-003",
                            customer: "Robert Johnson",
                            date: "2023-11-14",
                            status: "Shipped",
                            total: 79.99,
                        },
                        {
                            id: 4,
                            orderNumber: "ORD-2023-004",
                            customer: "Emily Davis",
                            date: "2023-11-13",
                            status: "Completed",
                            total: 149.97,
                        },
                        {
                            id: 5,
                            orderNumber: "ORD-2023-005",
                            customer: "Michael Wilson",
                            date: "2023-11-12",
                            status: "Cancelled",
                            total: 99.99,
                        },
                    ])
                    setLoading(false)
                }, 1000)
            } catch (error) {
                console.error("Error fetching dashboard data:", error)
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-emerald-500 rounded-md p-3">
                                <svg
                                    className="h-6 w-6 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                    />
                                </svg>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Products</dt>
                                    <dd className="text-lg font-semibold text-gray-900">{stats.totalProducts}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                                <svg
                                    className="h-6 w-6 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                </svg>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                                    <dd className="text-lg font-semibold text-gray-900">{stats.totalOrders}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                                <svg
                                    className="h-6 w-6 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                                    <dd className="text-lg font-semibold text-gray-900">{stats.totalUsers}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-pink-500 rounded-md p-3">
                                <svg
                                    className="h-6 w-6 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                                    <dd className="text-lg font-semibold text-gray-900">${stats.totalRevenue.toFixed(2)}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
                <div className="mt-4 flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Order
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Customer
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Total
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">View</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {recentOrders.map((order) => (
                                        <tr key={order.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {order.orderNumber}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                          <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  order.status === "Completed"
                                      ? "bg-green-100 text-green-800"
                                      : order.status === "Processing"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : order.status === "Shipped"
                                              ? "bg-blue-100 text-blue-800"
                                              : "bg-red-100 text-red-800"
                              }`}
                          >
                            {order.status}
                          </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total.toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <a href="#" className="text-emerald-600 hover:text-emerald-900">
                                                    View
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
