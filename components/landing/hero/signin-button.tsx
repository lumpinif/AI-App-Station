import useAccountModal from "@/hooks/use-account-modal-store"
import GithubLoginButton from "@/components/auth/signin/github-login-button"
import GoogleLoginButton from "@/components/auth/signin/google-login-button"

const LogInButtons = () => {
  const openAccountModal = useAccountModal((state) => state.openModal)
  return (
    <div className="flex animate-magic-fade-in flex-col gap-y-4 opacity-0 [--animation-delay:400ms]">
      <span className="select-none text-sm font-light text-muted-foreground">
        <span
          onClick={openAccountModal}
          className="border-b border-muted underline-offset-4 transition-all duration-200 ease-out hover:cursor-pointer hover:border-primary hover:text-primary"
        >
          Log in here
        </span>{" "}
      </span>
      <div className="flex items-center gap-x-2">
        <GithubLoginButton
          size={"label"}
          variant={"outline"}
          className="w-32 active:scale-[.98] dark:border-0 dark:hover:bg-background dark:hover:shadow-outline"
        />
        <span className="text-sm font-light text-muted-foreground">
          or with
        </span>
        <GoogleLoginButton
          size={"label"}
          variant={"outline"}
          className="w-32 active:scale-[.98] dark:border-0 dark:hover:bg-background dark:hover:shadow-outline"
        />
      </div>
    </div>
  )
}

export default LogInButtons
