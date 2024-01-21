import SignOutButton from "@/components/auth/signout/sign-out-button"
import BackButton from "@/components/shared/back-button"

const SignOutPage = async () => {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center px-4 sm:max-w-xl">
      <BackButton
        href="/"
        className="absolute left-4 top-4 dark:shadow-outline md:left-8 md:top-8"
      />
      <SignOutButton />
    </div>
  )
}

export default SignOutPage
