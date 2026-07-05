import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";

enum CATEGORY_TYPE {
  MEN = " Men",
  WOMEN = " Women",
  KIDS = " Kids",
}
const CATEGORY_OPTIONS = [
  CATEGORY_TYPE.WOMEN,
  CATEGORY_TYPE.MEN,
  CATEGORY_TYPE.KIDS,
];

enum SUBCATEGORY_TYPE {
  DRESS = "Dress",
  TOPS = "Tops",
  SAREE = "Saree",
  JEANS = "Jeans",
  TSHIRTS = "TShirts",
  KIDS_DRESS = "Dress",
  TOPS_AND_SHIRTS = "Tops & Shirts",
}
const WOMEN_CATEGORY_OPTIONS = [
  SUBCATEGORY_TYPE.DRESS,
  SUBCATEGORY_TYPE.TOPS,
  SUBCATEGORY_TYPE.SAREE,
];

const MEN_CATEGORY_OPTIONS = [SUBCATEGORY_TYPE.JEANS, SUBCATEGORY_TYPE.TSHIRTS];

const KIDS_CATEGORY_OPTIONS = [
  SUBCATEGORY_TYPE.KIDS_DRESS,
  SUBCATEGORY_TYPE.TOPS_AND_SHIRTS,
];

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

test("search for a product", async ({ page }) => {
  const productPage = new ProductPage(page);
  await productPage.goto();
  await productPage.searchProduct("T-Shirt");
  await expect(page).toHaveURL(/search=T-Shirt/);
  await expect(page.locator("body")).toContainText("Searched Products");
});

test("filter products by category", async ({ page }) => {
  const productPage = new ProductPage(page);
  await productPage.goto();
  await productPage.filterProductsByCategory(CATEGORY_TYPE.WOMEN);

  for (const category of WOMEN_CATEGORY_OPTIONS) {
    await expect(page.locator("body")).toContainText(category);
  }
});

test("filter products by subcategory", async ({ page }) => {
  const productPage = new ProductPage(page);
  await productPage.goto();
  await productPage.filterProductsByCategory(CATEGORY_TYPE.MEN);
  await productPage.filterProductsBySubCategory(SUBCATEGORY_TYPE.JEANS);

  await expect(page.locator("body")).toContainText(
    `${SUBCATEGORY_TYPE.JEANS} Products`,
  );
});

test("view product details", async ({ page }) => {
  const productPage = new ProductPage(page);
  await productPage.goto();
  await productPage.viewProductDetails();

  await expect(page).toHaveURL(/.*product_details\/1/);
});
