import { Icons } from "../icons/icons"

const SignUpToggle = () => {
  return (
    <div className="my-4 flex items-center justify-center gap-4 ">
      <span className="text-muted-foreground">Don&apos;t have an account?</span>
      <button className="flex items-center">
        Sign Up
        <span>
          <Icons.right />
        </span>
      </button>
    </div>
  )
}

export default SignUpToggle
