import { Separator } from "@/components/ui/separator"
import { AccountForm } from "@/components/auth/settings/account/account-form"

import {
  getUserData,
  getUserProfile,
} from "../../../../../utils/supabase/actions/auth"
import AccountFormSupabase from "./account-form"

export default async function SettingsAccountPage() {
  const {
    data: { user },
  } = await getUserData()

  const { data: profileData } = await getUserProfile(user)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator />
      <AccountForm user={user} profile={profileData} />
      <AccountFormSupabase user={user} />
    </div>
  )
}
