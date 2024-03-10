"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { cookies, headers } from "next/headers"

export async function auth(prevState: any, formData: FormData) {
  console.log({ formData: Object.fromEntries(formData) })

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(255),
  })

  const email = formData.get("email") || ""
  const password = formData.get("password") || ""

  const parsed = schema.safeParse({
    email,
    password,
  })

  console.log({ parsed })

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors.join(""),
      data: null,
    }
  }

  try {
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-From-Client": "true",
        "x-forwarded-host": process.env.API_URL || "localhost:3001",
      },
      body: JSON.stringify(parsed.data),
    })
    if (!response.ok) {
      console.log({ response })
      return {
        success: false,
        error: "An error occurred",
        data: null,
      }
    }

    const res = await response.json()

    console.log({ res })

    const { cookieOptions } = res

    console.log({ cookieOptions })

    cookies().set(
      cookieOptions.name,
      cookieOptions.value,
      cookieOptions.attributes,
    )

    console.log("Cookie should be set")

    // cookies().set(response.headers.get("set-cookie"))-**

    revalidatePath("/")

    return {
      success: true,
      data: null,
      error: null,
    }
  } catch (error) {
    console.error({ error })
    return {
      success: false,
      error: "An error occurred",
      data: null,
    }
  }
}
