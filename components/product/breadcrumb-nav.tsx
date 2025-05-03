import Link from "next/link"

interface BreadcrumbNavProps {
    categoryName: string
    categorySlug: string
    productName: string
}

export default function BreadcrumbNav({ categoryName, categorySlug, productName }: BreadcrumbNavProps) {
    return (
        <nav className="flex text-sm text-gray-500 mb-6">
            <ol className="flex items-center space-x-2">
                <li>
                    <Link href="/" className="hover:text-emerald-600">
                        Home
                    </Link>
                </li>
                <li>
                    <span className="mx-2">/</span>
                </li>
                <li>
                    <Link href="/products" className="hover:text-emerald-600">
                        Products
                    </Link>
                </li>
                <li>
                    <span className="mx-2">/</span>
                </li>
                <li>
                    <Link href={`/products?category=${categorySlug}`} className="hover:text-emerald-600">
                        {categoryName}
                    </Link>
                </li>
                <li>
                    <span className="mx-2">/</span>
                </li>
                <li className="text-gray-800 font-medium truncate max-w-[200px]" title={productName}>
                    {productName}
                </li>
            </ol>
        </nav>
    )
}
