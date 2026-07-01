import { Page, Locator } from "@playwright/test";

export class ContactPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly chooseFileButton: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByRole("textbox", { name: "Name" });
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.subjectInput = page.getByRole("textbox", { name: "Subject" });
    this.messageInput = page.getByRole("textbox", { name: "Message" });
    this.chooseFileButton = page.getByRole("button", { name: "Choose File" });
    this.submitButton = page.getByRole("button", { name: "Submit" });
  }

  async goto() {
    await this.page.getByRole("link", { name: " Contact us" }).click();
  }

  async fillForm(
    name: string,
    email: string,
    subject: string,
    message: string,
  ) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
    await this.chooseFileButton.setInputFiles("../tests/test-file.txt");
  }
}
