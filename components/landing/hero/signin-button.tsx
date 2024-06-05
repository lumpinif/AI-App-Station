import GithubLoginButton from "@/components/auth/signin/github-login-button"
import GoogleLoginButton from "@/components/auth/signin/google-login-button"

const SignInButtons = () => {
  return (
    <div className="flex animate-magic-fade-in flex-col gap-y-2 opacity-0 [--animation-delay:400ms]">
      <span className="select-none text-sm font-light text-muted-foreground">
        Log in with
      </span>
      <div className="flex items-center gap-x-2">
        <GithubLoginButton
          size={"label"}
          variant={"outline"}
          className="w-32 active:scale-[.98] dark:border-0 dark:hover:bg-background dark:hover:shadow-outline"
        />
        <span className="text-sm font-light text-muted-foreground">or</span>
        <GoogleLoginButton
          size={"label"}
          variant={"outline"}
          className="w-32 active:scale-[.98] dark:border-0 dark:hover:bg-background dark:hover:shadow-outline"
        />
      </div>
    </div>
  )
}

export default SignInButtons
