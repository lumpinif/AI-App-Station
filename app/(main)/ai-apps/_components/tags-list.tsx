import { TagsCarousel } from "./tags-carousel"

export function TagsList() {
  return (
    <div className="flex items-center gap-4 ">
      <div className="-ml-1 grow overflow-hidden transition-all duration-300 ease-linear sm:hidden">
        <TagsCarousel />
      </div>
    </div>
  )
}
