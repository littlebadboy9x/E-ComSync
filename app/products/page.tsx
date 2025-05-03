import { Suspense } from "react"
import ProductList from "../../components/product/product-list"
import ProductFilters from "../../components/product/product-filters"
import ProductSort from "../../components/product/product-sort"
import ProductSearch from "../../components/product/product-search"

export const metadata = {
    title: "Sản phẩm | E-ComSync",
    description: "Khám phá danh mục sản phẩm đa dạng của chúng tôi",
}

export default function ProductsPage({
    searchParams = {}
}: {
    searchParams?: { [key: string]: string | string[] }
}) {
    const search = typeof searchParams.search === "string" ? searchParams.search : ""
    const category = typeof searchParams.category === "string" ? searchParams.category : ""
    const sort = typeof searchParams.sort === "string" ? searchParams.sort : "featured"
    const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1
    const minPrice = typeof searchParams.minPrice === "string" ? Number.parseFloat(searchParams.minPrice) : undefined
    const maxPrice = typeof searchParams.maxPrice === "string" ? Number.parseFloat(searchParams.maxPrice) : undefined

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Sản phẩm</h1>

            {/* Search and Sort Row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <ProductSearch defaultValue={search} />
                <ProductSort defaultValue={sort} />
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar */}
                <div className="w-full lg:w-1/4">
                    <ProductFilters selectedCategory={category} minPrice={minPrice} maxPrice={maxPrice} />
                </div>

                {/* Product Grid */}
                <div className="w-full lg:w-3/4">
                    <Suspense fallback={<ProductListSkeleton />}>
                        <ProductList
                            search={search}
                            category={category}
                            sort={sort}
                            page={page}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                        />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

function ProductListSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(9)
                .fill(0)
                .map((_, i) => (
                    <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                        <div className="h-64 w-full bg-gray-200 animate-pulse"></div>
                        <div className="p-4">
                            <div className="h-6 w-3/4 bg-gray-200 animate-pulse mb-2"></div>
                            <div className="h-4 w-1/2 bg-gray-200 animate-pulse mb-4"></div>
                            <div className="h-6 w-1/3 bg-gray-200 animate-pulse"></div>
                        </div>
                    </div>
                ))}
        </div>
    )
}
