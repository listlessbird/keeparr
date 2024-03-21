import { expect, test } from "@playwright/test"

test.describe("landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/")
  })

  test("landing page renders", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "KeepArr" })).toBeVisible()
  })

  test("dark mode toggle works", async ({ page }) => {
    await page.getByRole("button", { name: "Toggle Theme" }).click()

    await page.getByRole("menuitem", { name: "Dark" }).click()

    await expect(page.locator("html").first()).toHaveClass("dark")
  })

  test("it goes to the auth page from the landing", async ({ page }) => {
    await page.locator("button[data-testid=nav-menu]").click()

    await page.locator("a[href='/auth']").click()

    await page.waitForTimeout(1000)

    await expect(page.url()).toBe("http://localhost:3000/auth")
  })
})
