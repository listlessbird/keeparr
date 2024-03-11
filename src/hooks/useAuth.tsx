// hook to be used in client components for logged in user's data

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useTransition,
} from "react"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

type User = {
  email: string
  id: string
  username: string
}

type Session = {
  expiresAt: string
  id: string
  userId: string
  fresh: boolean
}

type AuthContextData = {
  user: User | null
  session: Session | null
  logout: () => void
}

type AuthState = Omit<AuthContextData, "logout">

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

type AuthReducerFunc<S, A> = (state: S, action: A) => S

enum AuthActionTypes {
  GET_USER = "user/get",
  LOGOUT = "user/logout",
}

type AuthAction =
  | {
      type: AuthActionTypes.GET_USER
      payload: { user: User; session: Session }
    }
  | {
      type: AuthActionTypes.LOGOUT
    }

function authReducer(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case AuthActionTypes.GET_USER:
      return {
        ...state,
        user: action.payload.user,
        session: action.payload.session,
      }
    case AuthActionTypes.LOGOUT:
      return { ...state, user: null, session: null }
    default:
      return state
  }
}

const initialAuthState = {
  user: null,
  session: null,
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState)
  const router = useRouter()
  const [, startTransiton] = useTransition()

  const { toast } = useToast()

  useEffect(function () {
    async function getUser() {
      try {
        const resp = await fetch("/api/v1/auth", { credentials: "include" })

        if (!resp.ok) {
          // dispatch({ type: "user/logout" })

          toast({
            itemID: "auth-error",
            variant: "destructive",
            title: "Error",
            description: "Something went wrong..",
            action: (
              <ToastAction altText="try again" onClick={() => getUser()}>
                Try Again
              </ToastAction>
            ),
          })
        }

        const json = await resp.json()

        dispatch({ type: AuthActionTypes.GET_USER, payload: json })
      } catch (error) {
        toast({
          itemID: "auth-error-2",
          variant: "destructive",
          title: "Error",
          description: "Something went wrong..",
          action: (
            <ToastAction altText="try again" onClick={() => getUser()}>
              Try Again
            </ToastAction>
          ),
        })
      }
    }

    getUser()
  }, [])

  async function logout() {
    const resp = await fetch("/api/v1/auth/logout", {
      credentials: "include",
    })

    if (!resp.ok) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong..",
        action: (
          <ToastAction altText="try again" onClick={() => logout()}>
            Try Again
          </ToastAction>
        ),
      })
      return
    }

    const json = await resp.json()

    if (json.success) {
      dispatch({ type: AuthActionTypes.LOGOUT })

      startTransiton(() => {
        router.replace("/auth")
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, session: state.session, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return ctx
}

export { AuthContext }
