import Image from "next/image"

import { Photo } from "@/config/_dummy-photos"

export default function ContentCard({ photo }: { photo: Photo }) {
  return (
    <>
      <section className="flex w-full flex-col p-2 sm:p-4">
        <div className="grid w-full gap-4 lg:grid-cols-2">
          {/* Left Image Area */}
          <div className="relative hidden w-full border lg:col-span-1 lg:flex lg:items-center lg:justify-center">
            <div className="top-1/2 w-1/5 -translate-y-1/2 lg:fixed">
              <Image
                alt=""
                src={photo.imageSrc}
                height={600}
                width={600}
                className="rounded-xl object-cover"
              />
            </div>
          </div>

          {/* Content Area */}
          <div className="h-[2000px] w-full p-2 px-4 lg:col-span-1">
            <Image
              alt=""
              src={photo.imageSrc}
              height={600}
              width={600}
              className="aspect-square w-full rounded-xl object-cover lg:hidden"
            />
            <h3 className="text-xl font-medium">{photo.name}</h3>
            <p className="text-sm text-muted-foreground">
              Taken by {photo.username}
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel
              aliquam, iure eum, exercitationem possimus hic perspiciatis earum
              architecto, veritatis iste dolores aspernatur. Neque distinctio
              temporibus quod cupiditate corporis sequi quos. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Distinctio enim, quas
              veniam omnis corrupti rerum beatae suscipit quod quisquam,
              temporibus esse labore, sapiente eaque eveniet porro explicabo
              unde dolorem deserunt!
            </p>
            <Image
              alt=""
              src={photo.imageSrc}
              height={600}
              width={600}
              className="aspect-square w-full rounded-xl object-cover"
            />
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel
              aliquam, iure eum, exercitationem possimus hic perspiciatis earum
              architecto, veritatis iste dolores aspernatur. Neque distinctio
              temporibus quod cupiditate corporis sequi quos. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Distinctio enim, quas
              veniam omnis corrupti rerum beatae suscipit quod quisquam,
              temporibus esse labore, sapiente eaque eveniet porro explicabo
              unde dolorem deserunt!
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
