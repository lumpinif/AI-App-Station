import Image from "next/image"

type AppDetailScreenshotsProps = {
  data?: string[]
}

export const AppDetailScreenshots: React.FC<AppDetailScreenshotsProps> = ({
  data,
}) => {
  return (
    <>
      <div className="">
        <h2 className="text-xl font-bold">iPhone Screenshots</h2>
        <div className="mt-4 flex space-x-4 overflow-x-auto">
          <Image
            alt="Screenshot 1"
            className="rounded-lg shadow-lg"
            height="500"
            src="/images/preview1.png"
            style={{
              aspectRatio: "250/500",
              objectFit: "cover",
            }}
            width="250"
          />
          <Image
            alt="Screenshot 2"
            className="rounded-lg shadow-lg"
            height="500"
            src="/images/preview1.png"
            style={{
              aspectRatio: "250/500",
              objectFit: "cover",
            }}
            width="250"
          />
          <Image
            alt="Screenshot 3"
            className="rounded-lg shadow-lg"
            height="500"
            src="/images/preview1.png"
            style={{
              aspectRatio: "250/500",
              objectFit: "cover",
            }}
            width="250"
          />
          <Image
            alt="Screenshot 4"
            className="rounded-lg shadow-lg"
            height="500"
            src="/images/preview1.png"
            style={{
              aspectRatio: "250/500",
              objectFit: "cover",
            }}
            width="250"
          />
        </div>
      </div>
    </>
  )
}
