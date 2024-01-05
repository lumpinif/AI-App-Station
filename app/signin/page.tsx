import LoginCard from "@/components/auth/login-card"

const SignInPage = () => {
  return (
    <>
      <div className="mx-auto flex max-w-sm items-center justify-center px-4 sm:max-w-md">
        <LoginCard className="shadow-inner-outline dark:shadow-outline" />
      </div>
    </>
  )
}

export default SignInPage
