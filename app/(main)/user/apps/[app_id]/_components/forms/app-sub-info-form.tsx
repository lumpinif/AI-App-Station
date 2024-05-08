import { App } from "@/types/db_tables"

import { AppCopyRightForm } from "./app-copy-right-form"
import { AppPricingForm } from "./app-pricing-form"

type AppSubInfoFormProps = {
  app_id: App["app_id"]
  pricing: App["pricing"]
  copy_right: App["copy_right"]
}

export const AppSubInfoForm: React.FC<AppSubInfoFormProps> = ({
  app_id,
  pricing,
  copy_right,
}) => {
  return (
    <section className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
      {/* <h1 className="w-fit select-none text-lg font-semibold sm:text-2xl">
        Other Information
      </h1> */}
      <AppPricingForm app_id={app_id} pricing={pricing} />
      <AppCopyRightForm app_id={app_id} copy_right={copy_right} />
    </section>
  )
}
