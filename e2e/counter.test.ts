import { expect, test } from "@playwright/test";

test("Click then increment", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector("#app");
  expect(await page.getByTestId("countValue").textContent()).toBe("count:0");
  await page.getByText("increment").click();
  expect(await page.getByTestId("countValue").textContent()).toBe("count:1");
});
