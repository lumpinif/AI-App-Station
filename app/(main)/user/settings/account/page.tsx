import { Separator } from "@/components/ui/separator"
import { AccountForm } from "@/components/auth/settings/account/account-form"

import AccountFormSupabase from "./account-form"

export default async function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-muted-foreground text-sm">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator />
      <AccountForm />
      <AccountFormSupabase />
    </div>
  )
}
