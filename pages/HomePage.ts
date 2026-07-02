import { Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://automationexercise.com/");
    const adPopup = this.page.locator('iframe[name="aswift_3"]');
    if (await adPopup.isVisible()) {
      await adPopup
        .contentFrame()
        .getByRole("button", { name: "Close ad" })
        .click();
    }
  }

  async cookieConsent() {
    const consentButton = this.page.getByRole("button", { name: "Consent" });
    if (await consentButton.isVisible()) {
      await consentButton.click();
    }
  }
}
