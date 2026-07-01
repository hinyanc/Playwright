import { Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://automationexercise.com/");
  }

  async cookieConsent() {
    const consentButton = this.page.getByRole("button", { name: "Consent" });
    if (await consentButton.isVisible()) {
      await consentButton.click();
    }
  }
}
