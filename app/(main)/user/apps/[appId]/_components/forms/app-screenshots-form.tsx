"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"

type AppScreenshotsFormProps = {}

export const AppScreenshotsForm: React.FC<AppScreenshotsFormProps> = ({}) => {
  return (
    <>
      <section className="w-full flex-col space-y-2">
        <h1
          className="w-fit text-2xl font-semibold tracking-wide"
          // onClick={toggleEdit}
        >
          Screenshots Gallary
        </h1>
        <Card className="w-full">
          <CardHeader>
            <CardDescription>Upload images</CardDescription>
          </CardHeader>
          <CardContent className="">
            <form>
              <div className="grid h-44 w-full items-center gap-4 rounded-xl border border-dashed"></div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      </section>
    </>
  )
}
