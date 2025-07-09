import test, { expect } from "@playwright/test";
import { PomManager } from "../../../marterial-playwright-pages/pom-manager";

test("User Registration", async ({ page }) => {
  let url = "https://material.playwrightvn.com/";
  let pom = new PomManager(page);

  let registerPage = pom.getRegisterPage();
  let homePage = pom.getHomePage(url);

  const username = "Mialala";
  const email = "mielele@gmail.com";
  const interest = "art";
  const country = "canada";
  const dob = "2000-12-03";
  const profileFilePath = "tests/lesson-04/exercises/profile.txt";
  const bio = "hello guys, i'm mia";
  const rate = "8";
  const customDate = "2020-04-12";

  await test.step("Go to Website", async () => {
    await homePage.goToWebsite(url);
  });

  await test.step("Click Bai Hoc 1", async () => {
    await homePage.openLessonPage("register-page");
  });

  await test.step("Fill User Registration form", async () => {
    await registerPage.fillUsername(username);
    await registerPage.fillEmail(email);
    await registerPage.checkGender();
    await registerPage.checkHobby();
    await registerPage.selectInterest(interest);
    await registerPage.selectCountry(country);
    await registerPage.fillDob(dob);
    await registerPage.setProfilePicture(profileFilePath);
    await registerPage.fillBio(bio);
    await registerPage.fillRating(rate);
    await registerPage.checkNewsletter();
    await registerPage.clickEnableFeature();
  });

  await test.step("Click Register User button", async () => {
    await registerPage.clickBtnSubmit();

    await expect(await registerPage.getLocator(username)).toBeVisible();
    await expect(await registerPage.getLocator(email)).toBeVisible();

    const info = await registerPage.getRegisterInfo();
    const formData = registerPage.parseTextContentToObject(info || "");

    const expectedData = {
      Gender: "male",
      Hobbies: "reading",
      Country: country,
      "Date of Birth": dob,
      Biography: bio,
      Rating: rate,
      "Favorite Color": "#ff0000",
      Newsletter: "Yes",
      "Enable Feature": "Yes",
      "Star Rating": "0⭐",
      "Custom Date": "",
    };
    for (const key in formData) {
      expect(formData[key]).toBe(expectedData[key]);
    }
  });
}); 
