import { db } from "@/db/db"
import { User, userTable } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getUserFromGoogleId(id: string) {
  const result = await db
    .select({ user: userTable })
    .from(userTable)
    .where(eq(userTable.googleId, id))

  if (result.length < 1) {
    return null
  }

  const { user } = result[0]

  return user
}

export async function createUser({
  email,
  googleId,
  username,
  picture,
}: Omit<User, "id">) {
  const userId = "keeparr-user-" + googleId.slice(0, 4)
  const user = await db
    .insert(userTable)
    .values({
      email,
      googleId,
      username,
      picture,
      id: userId,
    })
    .returning()

  return user[0]
}
