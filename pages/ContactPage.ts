import { Page, Locator } from "@playwright/test";
import path from "path";

export class ContactPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly chooseFileButton: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByRole("textbox", { name: "Name" });
    this.emailInput = page.getByRole("textbox", { name: "Email", exact: true });
    this.subjectInput = page.getByRole("textbox", { name: "Subject" });
    this.messageInput = page.getByRole("textbox", {
      name: "Your Message Here",
    });
    this.chooseFileButton = page.getByRole("button", { name: "Choose File" });
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.successMessage = page.locator(".status.alert.alert-success");
  }

  async goto() {
    await this.page.getByRole("link", { name: " Contact us" }).click();
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
  }

  async uploadFile(filePath: string) {
    // const filePath = path.resolve("tests", "test-file.txt");
    await this.chooseFileButton.setInputFiles(filePath);
  }

  async submit() {
    await this.page.once("dialog", (dialog) => {
      dialog.accept();
    });
    await this.submitButton.click();
  }
}
