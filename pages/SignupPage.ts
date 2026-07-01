import { Page, Locator } from "@playwright/test";

export class SignupPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailAddressInput: Locator;
  readonly signupButton: Locator;
  readonly passwordInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipCodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page
      .locator("form")
      .filter({ hasText: "Signup" })
      .getByPlaceholder("Name");
    this.emailAddressInput = page
      .locator("form")
      .filter({ hasText: "Signup" })
      .getByPlaceholder("Email Address");
    this.signupButton = page.getByRole("button", { name: "Signup" });
    this.passwordInput = page.getByRole("textbox", { name: "Password *" });
    this.firstNameInput = page.getByRole("textbox", { name: "First Name *" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last Name *" });
    this.addressInput = page.getByRole("textbox", { name: "Address *" });
    this.countrySelect = page.getByLabel("Country *");
    this.stateInput = page.getByRole("textbox", { name: "State *" });
    this.cityInput = page.getByRole("textbox", { name: "City * Zipcode *" });
    this.zipCodeInput = page.locator("#zipcode");
    this.mobileNumberInput = page.getByRole("textbox", {
      name: "Mobile Number *",
    });
    this.createAccountButton = page.getByRole("button", {
      name: "Create Account",
    });
  }

  async navigateFromHomepage() {
    await this.page.getByRole("link", { name: " Signup / Login" }).click();
  }

  async fillForm(name: string, email: string) {
    await this.nameInput.click();
    await this.nameInput.fill(name);
    await this.emailAddressInput.click();
    await this.emailAddressInput.fill(email);
  }

  async submit() {
    await this.signupButton.click();
  }

  async fillBasicInfoAndSubmit(name: string, email: string) {
    await this.fillForm(name, email);
    await this.submit();
  }

  async informationFormFill(
    password: string,
    firstName: string,
    lastName: string,
    address: string,
    country: string,
    state: string,
    city: string,
    zipCode: string,
    mobileNumber: string,
  ) {
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
    await this.firstNameInput.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.click();
    await this.lastNameInput.fill(lastName);
    await this.addressInput.click();
    await this.addressInput.fill(address);
    await this.countrySelect.selectOption(country);
    await this.stateInput.click();
    await this.stateInput.fill(state);
    await this.cityInput.click();
    await this.cityInput.fill(city);
    await this.zipCodeInput.click();
    await this.zipCodeInput.fill(zipCode);
    await this.mobileNumberInput.click();
    await this.mobileNumberInput.fill(mobileNumber);
  }

  async createAccount() {
    await this.createAccountButton.click();
  }
}
