import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailAddressInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailAddressInput = page
      .locator("form")
      .filter({ hasText: "Login" })
      .getByPlaceholder("Email Address");
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async navigateFromHomepage() {
    await this.page.getByRole("link", { name: " Signup / Login" }).click();
  }

  async fillForm(email: string, password: string) {
    await this.emailAddressInput.click();
    await this.emailAddressInput.fill(email);
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.loginButton.click();
  }
}
