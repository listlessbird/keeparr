import { expect, test } from "@playwright/test"

test.describe("auth page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/auth")
  })

  test("auth page renders", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible()
  })
})

// test("get started link", async ({ page }) => {
//   await page.goto("https://playwright.dev/")

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click()

//   // Expects page to have a heading with the name of Installation.
//   await expect(
//     page.getByRole("heading", { name: "Installation" }),
//   ).toBeVisible()
// })
