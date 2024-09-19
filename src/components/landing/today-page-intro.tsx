import { BentoDemo } from "./magic-ui/bento-demo"

const TodayPageIntro = () => {
  return (
    <section
      id="today page introduction"
      className="container relative mx-auto mt-8 max-w-7xl px-6 text-center sm:mt-40 md:mt-44"
    >
      <h1 className="page-title-font my-20 text-balance text-4xl sm:text-5xl">
        Today dashboard <br /> with daily updated AI News.
      </h1>

      <BentoDemo />
    </section>
  )
}

export default TodayPageIntro
