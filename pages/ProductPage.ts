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
    await this.page.locator(".productinfo").first().hover();
    await this.page.locator(".overlay-content .add-to-cart").first().click();
  }

  async viewCart() {
    await this.page.getByRole("link", { name: "View Cart" }).click();
  }

  async viewProductDetails() {
    await this.page
      .getByRole("link", { name: " View Product" })
      .first()
      .click();
  }

  async addToCartFromProductDetails() {
    await this.page
      .getByRole("link", { name: " View Product" })
      .first()
      .click();
    await this.page.getByRole("button", { name: " Add to cart" }).click();
  }

  async deleteProductFromCart() {
    await this.page.getByRole("link", { name: " Cart" }).click();
    if (await this.page.locator(".cart_quantity_delete").isVisible()) {
      await this.page.locator(".cart_quantity_delete").click();
    }
  }

  async proceedToCheckout() {
    await this.page.getByText("Proceed To Checkout").click();
  }

  async placeOrder(
    name: string,
    cardNumber: string,
    cvc: string,
    expiryMonth: string,
    expiryYear: string,
  ) {
    await this.page.getByRole("link", { name: "Place Order" }).click();
    await this.page.locator('input[name="name_on_card"]').fill(name);
    await this.page.locator('input[name="card_number"]').fill(cardNumber);
    await this.page.getByRole("textbox", { name: "ex." }).fill(cvc);
    await this.page.getByRole("textbox", { name: "MM" }).fill(expiryMonth);
    await this.page.getByRole("textbox", { name: "YYYY" }).fill(expiryYear);
    await this.page
      .getByRole("button", { name: "Pay and Confirm Order" })
      .click();
  }
}
