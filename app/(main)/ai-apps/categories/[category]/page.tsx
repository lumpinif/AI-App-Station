import { Metadata } from "next"
import { getUserData } from "@/server/auth"
import { getAppsByConfig } from "@/server/queries/supabase/apps/apps-fetch-by-config"
import { getCategoryBySlug } from "@/server/queries/supabase/categories"

import { Categories } from "@/types/db_tables"
import { siteConfig } from "@/config/site"
import { getSiteUrl } from "@/lib/utils"

import AiAppsPagesTitle from "../../_components/ai-apps-page-title"
import { AppCarouselLgCard } from "../../_components/cards/app-carousel-lg-card"

interface CategoryPageProps {
  params: { category: string }
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categoryBySlug } = await fetchAllCategories(params.category)

  if (!categoryBySlug) {
    return {}
  }

  const category_name = categoryBySlug?.category_name

  const ogImage = siteConfig.ogImage

  return {
    title: `Category - ${category_name}`,
    description: `AI Apps by category - ${category_name}`,
    openGraph: {
      title: `Category - ${category_name}`,
      description: `AI Apps by category - ${category_name}`,
      type: "article",
      url: getSiteUrl() + `/ai-apps/categories/${params.category}`,
      images: [
        {
          url: ogImage,
          width: 1400,
          height: 800,
          alt: `${siteConfig.name} | Category - ${category_name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Category - ${category_name}`,
      description: `AI Apps by category - ${category_name}`,
      images: [ogImage],
    },
  }
}

async function fetchAllCategories(category: string) {
  const { category: categoryBySlug, error: getCategoryBySlugError } =
    await getCategoryBySlug(category)

  return { categoryBySlug, getCategoryBySlugError }
}

async function fetchAppsByCategory(
  category_slug?: Categories["category_slug"]
) {
  if (!category_slug) {
    return {
      appsByCategory: null,
      getAppsByCategoryError: "No category slug provided",
    }
  }

  const { apps: appsByCategory, getAppsByConfigError: getAppsByCategoryError } =
    await getAppsByConfig({
      config: {
        title: "Newest Added",
        order: [
          {
            column: "created_at",
            options: { ascending: false },
          },
        ],
        limit: {
          limit: 15,
        },
        filters: [],
        innerJoinTables: [],
      },
      byField: {
        table: "categories",
        column: "category_slug",
        value: category_slug,
      },
    })

  return { appsByCategory, getAppsByCategoryError }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: category_slug } = params

  // Get user
  const {
    data: { user },
  } = await getUserData()

  const { categoryBySlug, getCategoryBySlugError } =
    await fetchAllCategories(category_slug)

  if (getCategoryBySlugError) {
    console.error("Failed to fetch category by slug:", getCategoryBySlugError)
    return (
      <section className="flex flex-col gap-y-4">
        <p>Sorry, there was an error loading this category.</p>
      </section>
    )
  }

  const { appsByCategory, getAppsByCategoryError } =
    await fetchAppsByCategory(category_slug)

  if (getAppsByCategoryError) {
    return (
      <section className="flex flex-col gap-y-4 text-muted-foreground">
        <p>Sorry, there was an error loading apps by category.</p>
        <p>Error: {getAppsByCategoryError}</p>
      </section>
    )
  }

  const pageTitle =
    (categoryBySlug && categoryBySlug?.category_name) || "Category"

  return (
    <section className="flex flex-col gap-y-4">
      <AiAppsPagesTitle
        title={pageTitle}
        href={`/ai-apps/categories/${category_slug}`}
      />

      {appsByCategory?.length === 0 && <p>No apps found in this category.</p>}

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {appsByCategory?.map((app, index) => (
          <AppCarouselLgCard key={index} app={app} user={user} />
        ))}
      </div>
    </section>
  )
}
