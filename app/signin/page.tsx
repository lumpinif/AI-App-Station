import LoginCard from "@/components/auth/login-card"
import SignInPageHeader from "@/components/auth/sign-in-page-header"
import SignUpToggle from "@/components/auth/sign-up-toggle"

const SignInPage = () => {
  return (
    <>
      <SignInPageHeader />
      <div className="mx-auto flex max-w-sm items-center justify-center px-4 sm:max-w-md md:max-w-lg lg:max-w-2xl">
        <LoginCard className="shadow-inner-outline dark:shadow-outline" />
      </div>
      <div className="mx-auto">
        <SignUpToggle />
      </div>
    </>
  )
}

export default SignInPage
