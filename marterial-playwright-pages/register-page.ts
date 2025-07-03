import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class RegisterPage extends BasePage {
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

  constructor(page: Page) {
    super(page);
  }

  async fillUsername(username: string): Promise<void> {
    await this.fillValue(this.xpathUsername, username);
  }

  async fillEmail(email: string): Promise<void> {
    await this.fillValue(this.xpathEmail, email);
  }

  async checkGender(): Promise<void> {
    await this.checkValue(this.xpathGenderMale);
  }

  async checkHobby(): Promise<void> {
    await this.checkValue(this.xpathHobbyReading);
  }

  async selectInterest(interest: string): Promise<void> {
    await this.selectOption(this.xpathInterest, interest);
  }

  async selectCountry(country: string): Promise<void> {
    await this.selectOption(this.xpathCountry, country);
  }

  async fillDob(dob: string): Promise<void> {
    await this.fillValue(this.xpathDob, dob);
  }

  async setProfilePicture(filePath: string): Promise<void> {
    await this.setFileInput(this.xpathProfile, filePath);
  }

  async fillBio(biography: string): Promise<void> {
    await this.fillValue(this.xpathBio, biography);
  }

  async fillRating(rate: string): Promise<void> {
    await this.fillValue(this.xpathRating, rate);
  }

  async checkNewsletter() {
    await this.hoverElement(this.xpathTooltip);
    await this.checkValue(this.xpathNewsletter);
  }

  async clickEnableFeature(): Promise<void> {
    await this.clickAt(this.xpathEnableFeature);
  }

  async fillCustomDate(value: string): Promise<void> {
    await this.fillValue(this.xpathCustomDate, value);
  }

  async clickBtnSubmit(): Promise<void> {
    await this.clickAt(this.xpathSubmitBtn);
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
