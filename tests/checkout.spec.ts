import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { LoginPage } from "../pages/LoginPage";

const TEST_LOGIN_EMAIL = process.env.TEST_VALID_EMAIL ?? "";
const TEST_PASSWORD = process.env.TEST_VALID_PASSWORD ?? "";

test.beforeEach(async ({ page }) => {
  await page.route(/(googlesyndication|doubleclick|adsbygoogle)/, (route) =>
    route.abort(),
  );
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

test("add product to cart in product details page", async ({ page }) => {
  const productPage = new ProductPage(page);
  await productPage.goto();
  await productPage.addToCartFromProductDetails();
  await expect(page).toHaveURL(/.*product_details\/1/);
  await expect(page.locator("body")).toContainText(
    "Your product has been added to cart.",
  );
});

test("view cart after adding product", async ({ page }) => {
  const productPage = new ProductPage(page);
  await productPage.goto();
  await productPage.addProductToCart();
  await productPage.viewCart();
  await expect(page).toHaveURL(/.*view_cart/);
  await expect(page.locator("body")).toContainText("Proceed To Checkout");
});

test("delete product from cart", async ({ page }) => {
  const productPage = new ProductPage(page);
  await productPage.goto();
  await productPage.deleteProductFromCart();

  await expect(page.locator("body")).toContainText("Cart is empty!");
});

test("proceed to checkout after login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  await loginPage.navigateFromHomepage();
  await loginPage.fillForm(TEST_LOGIN_EMAIL, TEST_PASSWORD);
  await loginPage.submit();
  await productPage.goto();
  await productPage.addProductToCart();
  await productPage.viewCart();
  await expect(page.locator("body")).toContainText("Proceed To Checkout");
  await productPage.proceedToCheckout();
  await expect(page).toHaveURL(/.*checkout/);
  await productPage.placeOrder(
    "Yannes Test",
    "4111111111111111",
    "123",
    "07",
    "2026",
  );
  await expect(page).toHaveURL(/.*payment_done/);
  await expect(page.locator("body")).toContainText(
    "Congratulations! Your order has been confirmed!",
  );
});

test("proceed to checkout without login", async ({ page }) => {
  const productPage = new ProductPage(page);
  await productPage.goto();
  await productPage.addProductToCart();
  await productPage.viewCart();
  await expect(page.locator("body")).toContainText("Proceed To Checkout");
  await productPage.proceedToCheckout();
  await expect(page).toHaveURL(/.*view_cart/);
  await expect(page.locator("body")).toContainText(
    "Register / Login account to proceed on checkout.",
  );
});
