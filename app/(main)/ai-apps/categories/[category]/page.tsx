import { SIDENAVROUTES } from "@/config/main-routes"

export const dynamicParams = false

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
  const categoryRoutes = SIDENAVROUTES.find(
    (route) => route.title === "Categories"
  )
  return (
    <div>
      Category Page: {category}
      <div className="">
        SideNavRoutes:{" "}
        {categoryRoutes?.items.map((r, index) => (
          <ul>
            <li>
              {index}-{r.href}
            </li>
          </ul>
        ))}
      </div>
    </div>
  )
}
