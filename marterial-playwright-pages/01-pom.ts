import { Locator, Page } from "@playwright/test";

export class MaterialBasePage {
  page: Page;
  xpathRegisterPage: string;
  xpathProductPage: string;
  cssTodoPage: string;
  personalNote: Locator;

  constructor(page: Page) {
    this.page = page;
  }

  async openMaterialPage(): Promise<void> {}
  async gotoPage(pageName: string): Promise<void> {}
}

export class RegisterPage extends MaterialBasePage {
  xpathUsername: string;
  xpathEmail: string;
  xpathGenderMale: string;
  xpathGenderFemale: string;

  constructor(page: Page) {
    super(page);
  }

  async fillUsername(): Promise<void> {}

  async fillEmail(): Promise<void> {}

  async checkGender(gender: string): Promise<void> {}
}
