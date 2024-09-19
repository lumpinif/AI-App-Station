import TextShimmer from "../magic-ui/text-shimmer"

const IntroducingBadge = () => {
  return (
    <div className="backdrop-filter-[12px] group inline-flex h-7 -translate-y-4 animate-magic-fade-in items-center justify-between gap-1 rounded-full border border-white/10 bg-white/40 px-3 text-sm text-white opacity-0 transition-all ease-in hover:cursor-pointer hover:bg-white/20 dark:border-0 dark:bg-white/10 dark:text-black dark:shadow-outline">
      <TextShimmer className="inline-flex items-center justify-center font-medium tracking-wide text-muted-foreground/70 transition-all ease-in hover:text-primary dark:text-muted-foreground/70">
        {/* ✨ */}
        <span>✨ Introducing AI App Station</span>{" "}
        {/* <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out hover:translate-x-0.5" /> */}
      </TextShimmer>
    </div>
  )
}

export default IntroducingBadge
