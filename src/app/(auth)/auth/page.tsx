"use client"
import { auth } from "@/app/(auth)/actions/auth.action"
import { useFormState, useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" aria-disabled={pending}>
      Log In
    </Button>
  )
}

const initialState = {
  success: false,
  errors: null,
  data: null,
}

export default function Auth() {
  const [state, formAction] = useFormState(auth, initialState as any)

  return (
    <div>
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-center">Login</h1>
          <form className="flex flex-col gap-4" action={formAction}>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="p-2 border border-foreground/60 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="p-2 border border-foreground/60 rounded-md"
                autoComplete="current-password"
              />
            </div>
            <SubmitButton />
          </form>
          <div>
            <Button
              onClick={async (e) => {
                e.preventDefault()

                const res = await fetch("/api/v1/auth")
                const data = await res.json()

                console.log({ data })
              }}
            >
              Make a request
            </Button>
          </div>
          <div>
            <pre>{JSON.stringify(state, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}
