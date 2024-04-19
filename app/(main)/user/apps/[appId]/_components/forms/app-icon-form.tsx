import Image from "next/image"

type AppIconFormProps = {}

export const AppIconForm: React.FC<AppIconFormProps> = ({}) => {
  const ImageElement = (
    <Image
      src={""}
      width={200}
      height={200}
      alt={"App Logo"}
      className="aspect-square rounded-xl"
      priority
    />
  )

  return (
    <div className="flex flex-none items-center justify-center overflow-hidden rounded-xl bg-card p-2 shadow-md outline-dotted transition-all duration-200 ease-out">
      {ImageElement}
    </div>
  )
}
