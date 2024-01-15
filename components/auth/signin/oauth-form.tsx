import GithubLoginButton from "./github-login-button"
import GoogleLoginButton from "./google-login-button"

export default function OAuthForm() {
  return (
    <div className="flex items-center justify-between gap-2">
      <GithubLoginButton />
      <GoogleLoginButton />
    </div>
  )
}
