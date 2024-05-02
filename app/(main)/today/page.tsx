import Image from "next/image"
import Link from "next/link"

import photos from "@/config/dummy-photos"

import GridPanel from "./_components/widgets-grid/grid-panel"

const TodayPage = () => {
  return (
    <>
      {/* <main className="relative flex h-full w-full flex-1 flex-col items-center">
        <div className="relative z-20 flex h-full w-full flex-col gap-6 xl:flex-row xl:gap-10">
          {/* Left Panel */}
      {/* <LeftPanel /> */}
      {/* Right Panel */}
      {/* <RightPanel /> */}
      {/* </div> */}
      {/* </main>  */}

      {/* <main className="relative flex h-full w-full"> */}
      <main>
        {/* <GridPanel /> */}
        <ul className="grid auto-rows-max grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {photos.map(({ id, imageSrc }) => (
            <li key={id}>
              <Link href={`/today/${id}`} scroll={false}>
                <Image
                  alt=""
                  src={imageSrc}
                  height={600}
                  width={600}
                  className="aspect-square w-full rounded-lg object-cover"
                />
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default TodayPage
