import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AccountModalTrigger from "@/components/auth/auth-modal/account-modal-trigger"
import { UserCard } from "@/components/auth/auth-modal/user-card"

type UserProfileCardProps = {}

export const UserProfileCard: React.FC<UserProfileCardProps> = () => {
  const router = useRouter()
  return (
    <Card
      className={
        "bg-background relative mx-auto border sm:border-0 md:max-w-xl lg:max-w-2xl"
      }
    >
      <CardHeader className="space-y-2 pb-3">
        <CardTitle className="flex items-center gap-x-4 md:flex-col">
          <div className="flex w-full items-center justify-between">
            <UserCard
              isWithLink={false}
              isTriggerModal={false}
              className="space-x-2 sm:space-x-4"
              profileNameCN="text-lg font-medium sm:text-2xl"
              profileEmailCN="text-sm font-normal text-muted-foreground tracking-normal"
              accountModalTriggerCN="size-16 md:size-20 lg:size-24"
              display="user_name"
            />
            <Button
              className="hidden rounded-full sm:block"
              size={"sm"}
              variant={"outline"}
            >
              Edit profile
            </Button>
          </div>
        </CardTitle>

        <CardDescription className="max-w-lg text-balance leading-relaxed">
          This is the bio info about the user. Lorem ipsum dolor sit amet
          consectetur adipisicing elit.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full sm:hidden" size={"sm"} variant={"default"}>
          Edit profile
        </Button>
      </CardFooter>
    </Card>
  )
}
