import { GearIcon, HeartIcon, PlusIcon } from "@radix-ui/react-icons"

export default function GooeyMenu() {
  return (
    <div className="relative h-[300px] w-full">
      <nav
        className="menu"
        style={
          {
            filter: "url(#gooey)",
            width: "100%",
            height: "100%",
            "--spring-easing":
              "linear(0, 0.88117 15.492%, 1.09261 23.232%, 1.10421 28.713%, 0.99031 49.585%,0.99995)",
          } as React.CSSProperties
        }
      >
        <input type="checkbox" className="peer hidden" name="menu" id="menu" />
        <label
          className="bg-mauve-dark-1 text-mauve-dark-12 ease-[var(--spring-easing)] dark:bg-mauve-light-1 dark:text-mauve-light-12 absolute bottom-10 right-10 z-10 flex h-14 w-14 scale-125 cursor-pointer items-center justify-center rounded-full transition-all duration-1000 peer-checked:rotate-[135deg] peer-checked:scale-100"
          htmlFor="menu"
        >
          <PlusIcon className="text-mauve-light-2 dark:text-mauve-dark-1 h-5 w-5" />
        </label>
        <button className="bg-mauve-dark-1 text-mauve-dark-12 peer-checked:ease-[var(--spring-easing)] dark:bg-mauve-light-1 dark:text-mauve-light-12 absolute bottom-10 right-10 flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 ease-in peer-checked:translate-y-[-80px] peer-checked:duration-1000">
          <GearIcon className="text-mauve-light-2 dark:text-mauve-dark-1 h-5 w-5" />
        </button>
        <button className="bg-mauve-dark-1 text-mauve-dark-12 peer-checked:ease-[var(--spring-easing)] dark:bg-mauve-light-1 dark:text-mauve-light-12 absolute bottom-10 right-10 flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 ease-in peer-checked:translate-y-[-162px] peer-checked:duration-1000">
          <HeartIcon className="text-mauve-light-2 dark:text-mauve-dark-1 h-5 w-5" />
        </button>
      </nav>
      <svg
        className="absolute hidden"
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="gooey">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
