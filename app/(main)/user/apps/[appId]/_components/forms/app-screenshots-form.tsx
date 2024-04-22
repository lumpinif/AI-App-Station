"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
