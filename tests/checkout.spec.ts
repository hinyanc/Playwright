import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.cookieConsent();
  await expect(page.getByRole("button", { name: "Consent" })).toBeHidden();
});

test("nav to product page", async ({ page }) => {
  const productPage = new ProductPage(page);
  await productPage.goto();
  await expect(page).toHaveURL(/.*products/);
});

test("add product to cart", async ({ page }) => {
  const productPage = new ProductPage(page);
  await productPage.goto();
  await productPage.addProductToCart();
  await expect(page.locator("body")).toContainText(
    "Your product has been added to cart.",
  );
});
