import { Page, Locator } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole("textbox", { name: "Search Product" });
    this.searchButton = page.locator("#submit_search");
  }

  async goto() {
    await this.page.getByRole("link", { name: " Products" }).click();
    const adPopup = this.page.locator('iframe[name="aswift_3"]');
    if (await adPopup.isVisible()) {
      await adPopup
        .contentFrame()
        .getByRole("button", { name: "Close ad" })
        .click();
    }
  }

  async searchProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async filterProductsByCategory(categoryName: string) {
    await this.page
      .getByRole("link", { name: categoryName, exact: true })
      .click();
  }

  async filterProductsBySubCategory(subcategoryName: string) {
    await this.page
      .getByRole("link", { name: subcategoryName, exact: true })
      .click();
  }

  async addProductToCart() {
    await this.page.getByText("Add to cart").nth(1).click();
    // await this.page.locator(".productinfo").first().hover();
    // await this.page.locator(".overlay-content .add-to-cart").first().click();
    // await this.page.getByRole("link", { name: "View Cart" }).click();
  }

  async viewProductDetails() {
    await this.page
      .getByRole("link", { name: " View Product" })
      .nth(1)
      .click();
    // await this.page.getByRole("button", { name: " Add to cart" }).click();
  }
}
