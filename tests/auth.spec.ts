import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";

const TEST_LOGIN_EMAIL = process.env.TEST_VALID_EMAIL ?? "";
const TEST_PASSWORD = process.env.TEST_VALID_PASSWORD ?? "";
const TEST_INVALID_EMAIL = process.env.TEST_INVALID_EMAIL ?? "";
const TEST_INVALID_PASSWORD = process.env.TEST_INVALID_PASSWORD ?? "";
const TEST_NAME = process.env.TEST_NAME ?? "";
const TEST_FIRST_NAME = process.env.TEST_FIRST_NAME ?? "";
const TEST_LAST_NAME = process.env.TEST_LAST_NAME ?? "";
const TEST_ADDRESS = process.env.TEST_ADDRESS ?? "";
const TEST_COUNTRY = process.env.TEST_COUNTRY ?? "";
const TEST_STATE = process.env.TEST_STATE ?? "";
const TEST_CITY = process.env.TEST_CITY ?? "";
const TEST_ZIPCODE = process.env.TEST_ZIPCODE ?? "";
const TEST_MOBILE_NUMBER = process.env.TEST_MOBILE_NUMBER ?? "";

test.beforeEach(async ({ page }) => {
  await page.route(/(googlesyndication|doubleclick|adsbygoogle)/, (route) =>
    route.abort(),
  );
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.cookieConsent();
  await expect(page.getByRole("button", { name: "Consent" })).toBeHidden();
});

test("nav to login page", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateFromHomepage();
  await expect(page).toHaveURL(/.*login/);
});

test("valid login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateFromHomepage();
  await loginPage.fillForm(TEST_LOGIN_EMAIL, TEST_PASSWORD);
  await loginPage.submit();

  await expect(page.locator("body")).toContainText("Logged in as");
});

test("invalid login with valid email and invalid password", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateFromHomepage();
  await loginPage.fillForm(TEST_LOGIN_EMAIL, TEST_INVALID_PASSWORD);
  await loginPage.submit();

  await expect(page.locator("body")).toContainText(
    "Your email or password is incorrect!",
  );
});

test("valid signup", async ({ page }) => {
  const uniqueSignupEmail = `test_${Date.now()}@example.com`;
  const signupPage = new SignupPage(page);

  await signupPage.navigateFromHomepage();
  await signupPage.fillBasicInfoAndSubmit(TEST_NAME, uniqueSignupEmail);

  await expect(page).toHaveURL(/.*signup/);
});

test("fill signup form", async ({ page }) => {
  const uniqueSignupEmail = `test_${Date.now()}@example.com`;
  const uniqueSignupPassword = `Qwe!${Date.now()}`;
  const signupPage = new SignupPage(page);

  await signupPage.navigateFromHomepage();
  await signupPage.fillBasicInfoAndSubmit(TEST_NAME, uniqueSignupEmail);

  await expect(page).toHaveURL(/.*signup/);

  await signupPage.informationFormFill(
    uniqueSignupPassword,
    TEST_FIRST_NAME,
    TEST_LAST_NAME,
    TEST_ADDRESS,
    TEST_COUNTRY,
    TEST_STATE,
    TEST_CITY,
    TEST_ZIPCODE,
    TEST_MOBILE_NUMBER,
  );
  await signupPage.createAccount();

  await expect(page).toHaveURL(/.*account_created/);
  await expect(page.locator("body")).toContainText("Account Created!");
});

test("invalid signup with existing email", async ({ page }) => {
  const signupPage = new SignupPage(page);

  await signupPage.navigateFromHomepage();
  await signupPage.fillBasicInfoAndSubmit(TEST_NAME, TEST_LOGIN_EMAIL);

  await expect(page.locator("body")).toContainText(
    "Email Address already exist!",
  );
});

test("fill signup form without required fields", async ({ page }) => {
  const uniqueSignupEmail = `test_${Date.now()}@example.com`;
  const signupPage = new SignupPage(page);

  await signupPage.navigateFromHomepage();
  await signupPage.fillBasicInfoAndSubmit(TEST_NAME, uniqueSignupEmail);

  await expect(page).toHaveURL(/.*signup/);

  // Submit the form without filling required fields
  await signupPage.createAccount();

  // Check for validation errors or messages indicating missing required fields
  await expect(page.locator("body")).toContainText("Please fill in this field");
});
