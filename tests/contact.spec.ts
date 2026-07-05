import { test, expect } from "@playwright/test";
import { ContactPage } from "../pages/ContactPage";
import path from "path";
import { HomePage } from "../pages/HomePage";

const TEST_NAME = process.env.TEST_NAME || "QA Test User";
const TEST_LOGIN_EMAIL =
  process.env.TEST_VALID_EMAIL || "test_user@example.com";

test.beforeEach(async ({ page }) => {
  await page.route(/(googlesyndication|doubleclick|adsbygoogle)/, (route) =>
    route.abort(),
  );
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.cookieConsent();
  await expect(page.getByRole("button", { name: "Consent" })).toBeHidden();
});

test("nav to contact us page", async ({ page }) => {
  const contactPage = new ContactPage(page);
  await contactPage.goto();
  await expect(page).toHaveURL(/.*contact_us/);
});

test("submit contact form with valid data and without attachment", async ({
  page,
}) => {
  const contactPage = new ContactPage(page);
  await contactPage.goto();
  await contactPage.fillForm(
    TEST_NAME,
    TEST_LOGIN_EMAIL,
    "Test Subject",
    "Test Message",
  );
  await contactPage.submit();

  await expect(contactPage.successMessage).toContainText(
    "Success! Your details have been submitted successfully.",
  );
});

test("submit contact form with valid data and with attachment", async ({
  page,
}) => {
  const contactPage = new ContactPage(page);
  await contactPage.goto();
  await contactPage.fillForm(
    TEST_NAME,
    TEST_LOGIN_EMAIL,
    "Test Subject",
    "Test Message",
  );
  const filePath = path.resolve("tests", "test-file.txt");
  await contactPage.uploadFile(filePath);
  await contactPage.submit();

  await expect(contactPage.successMessage).toContainText(
    "Success! Your details have been submitted successfully.",
  );
});
