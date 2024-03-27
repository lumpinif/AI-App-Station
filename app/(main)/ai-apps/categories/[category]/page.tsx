import { SIDENAVROUTES } from "@/config/routes"

export const dynamicParams = false // Set to false to generate static params

// Return a list of `params` to populate the [category] dynamic segment
export function generateStaticParams() {
  const categoryRoutes = SIDENAVROUTES.find(
    (route) => route.title === "Categories"
  )
  if (categoryRoutes) {
    const categoryParams = categoryRoutes.items.map((item) => ({
      category: item.href.split("/").pop(), // Extract the category from the href
    }))
    return categoryParams
  }
  return []
}

export default function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const { category } = params
  return <div>Category Page: {category}</div>
}
