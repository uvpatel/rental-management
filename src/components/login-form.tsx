"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { GitBranch } from "lucide-react"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [isGitHubPending, setIsGitHubPending] = useState(false)

  async function handleEmailSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError(null)
    setIsPending(true)

    try {
      const { error } = await authClient.signIn.email({
        email: email.trim().toLowerCase(),
        password,
        callbackURL: `${window.location.origin}/dashboard`,
      })

      if (error) {
        setError(error.message || "Invalid email or password.")
        return
      }

      router.push("/dashboard")
      router.refresh()
    } catch {
      setError("Unable to sign in. Please try again.")
    } finally {
      setIsPending(false)
    }
  }

  async function handleGitHubSignIn() {
    setError(null)
    setIsGitHubPending(true)

    try {
      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: `${window.location.origin}/dashboard`,
        errorCallbackURL: `${window.location.origin}/signin?error=github`,
      })

      if (error) {
        setError(error.message || "GitHub authentication failed.")
        setIsGitHubPending(false)
      }
    } catch {
      setError("Unable to connect to GitHub.")
      setIsGitHubPending(false)
    }
  }
  const isLoading = isPending || isGitHubPending

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleEmailSignIn}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Rentalflow Inc account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </Field>
              {error && (
                <p className="text-sm text-destructive" role="alert" aria-live="polite">
                  {error}
                </p>
              )}
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isPending ? "Signing in..." : "Login"}
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleGitHubSignIn}
                  disabled={isLoading}
                  aria-label="Login with GitHub"
                >
                  <GitBranch />
                  <span className="sr-only">
                    {isGitHubPending ? "Connecting..." : "Login with GitHub"}
                  </span>
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <Link href="/signup">Sign up</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/rental.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
