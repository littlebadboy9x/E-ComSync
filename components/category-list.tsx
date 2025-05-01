import Link from "next/link"

const categories = [
    { id: 1, name: "Electronics", image: "/placeholder.svg?height=200&width=200", slug: "electronics" },
    { id: 2, name: "Clothing", image: "/placeholder.svg?height=200&width=200", slug: "clothing" },
    { id: 3, name: "Home & Garden", image: "/placeholder.svg?height=200&width=200", slug: "home-garden" },
    { id: 4, name: "Beauty & Health", image: "/placeholder.svg?height=200&width=200", slug: "beauty-health" },
    { id: 5, name: "Sports", image: "/placeholder.svg?height=200&width=200", slug: "sports" },
    { id: 6, name: "Toys & Games", image: "/placeholder.svg?height=200&width=200", slug: "toys-games" },
]

export default function CategoryList() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
                <Link key={category.id} href={`/category/${category.slug}`} className="group">
                    <div className="bg-gray-100 rounded-lg overflow-hidden transition-transform duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                        <img src={category.image || "/placeholder.svg"} alt={category.name} className="w-full h-40 object-cover" />
                        <div className="p-4 text-center">
                            <h3 className="font-semibold text-gray-800">{category.name}</h3>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
