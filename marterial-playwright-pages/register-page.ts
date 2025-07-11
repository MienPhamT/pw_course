import { Locator, Page } from "@playwright/test";
export class RegisterPage {
  page: Page;
  xpathUsername = "//input[@id = 'username']";
  xpathEmail = '//input[@id = "email"]';
  xpathGenderMale = '//input[@id = "male"]';
  xpathHobbyReading = '//input[@id = "reading"]';
  xpathInterest = "select#interests";
  xpathCountry = "select#country";
  xpathDob = '//input[@id = "dob"]';
  xpathProfile = '//input[@id = "profile"]';
  xpathBio = '//textarea[@id = "bio"]';
  xpathRating = '//input[@id ="rating"]';
  xpathTooltip = '//div[@class = "tooltip"]';
  xpathNewsletter = '//input[@id = "newsletter"]';
  xpathEnableFeature = '//label[@class="switch"]';
  xpathCustomDate = '//input[@id="customDate"]';
  xpathSubmitBtn = '//button[@type = "submit"]';
  xpathRegisterInfo = '//td[4]'; // chua toi uu

  xpathCredential = (name: string) => {
    return `//td[text() = '${name}']`
  };

  constructor(page: Page) {
    this.page = page;
  }

  async fillUsername(username: string): Promise<void> {
    await this.page.locator(this.xpathUsername).fill(username);
  }

  async fillEmail(email: string): Promise<void> {
    await this.page.locator(this.xpathEmail).fill(email);
  }

  async checkGender(): Promise<void> {
    await this.page.locator(this.xpathGenderMale).check();
  }

  async checkHobby(): Promise<void> {
    await this.page.locator(this.xpathHobbyReading).check();
  }

  async selectInterest(interest: string): Promise<void> {
    await this.page.selectOption(this.xpathInterest, interest);
  }

  async selectCountry(country: string): Promise<void> {
    await this.page.selectOption(this.xpathCountry, country);
  }

  async fillDob(dob: string): Promise<void> {
    await this.page.locator(this.xpathDob).fill(dob);
  }

  async setProfilePicture(filePath: string): Promise<void> {
    await this.page.locator(this.xpathProfile).setInputFiles(filePath);
  }

  async fillBio(biography: string): Promise<void> {
    await this.page.locator(this.xpathBio).fill(biography);
  }

  async fillRating(rate: string): Promise<void> {
    await this.page.locator(this.xpathRating).fill(rate);
  }

  async checkNewsletter() {
    await this.page.locator(this.xpathTooltip).hover();
    await this.page.locator(this.xpathNewsletter).check();
  }

  async clickEnableFeature(): Promise<void> {
    await this.page.locator(this.xpathEnableFeature).click();
  }

  async fillCustomDate(value: string): Promise<void> {
    await this.page.locator(this.xpathCustomDate).fill(value);
  }

  async clickBtnSubmit(): Promise<void> {
    await this.page.locator(this.xpathSubmitBtn).click();
  }

  async getLocator(text: string): Promise<Locator> {
    return await this.page.locator(this.xpathCredential(text));
  }

  async getRegisterInfo(): Promise<string | null> {
    return await this.page.locator(this.xpathRegisterInfo).textContent();
  }

  parseTextContentToObject(text: string): Record<string, string> {
    const result: Record<string, string> = {};
    const lines = text.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.length === 0) continue;

      const colonIndex = line.indexOf(":");
      if (colonIndex === -1) continue; // nếu không có dấu ':' thì bỏ qua

      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();

      result[key] = value;
    }
    return result;
  }
}