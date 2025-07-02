import test, { expect } from "@playwright/test";
import { RegisterPage } from "../../../pages/register-page";
import { HomePage } from "../../../pages/home-page";

test("User Registration", async ({ page }) => {
  let url = "https://material.playwrightvn.com/";
  let xpathRegisterPage = '//a[contains(@href,  "register-page")]';

  let registerPage = new RegisterPage(page);
  let homePage = new HomePage(url, page);

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
    await homePage.goToTheWebsite(url);
  });

  await test.step("Click Bai Hoc 1", async () => {
    await homePage.openPage(xpathRegisterPage);
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

    // Star rating
    // const box = await registerPage.getBoundingBox('//div[@id="starRating"]');
    // if (box) {
    //   const percent = 80;
    //   const xOffset = (percent / 100) * box.width;
    //   await page.mouse.click(box.x + xOffset, box.y + box.height / 2);
    // }

    // Custom date (need to remove readonly before fill )
    // await registerPage.removeAttributeInDom(
    //   '//input[@id="customDate"]',
    //   "readonly"
    // );
    //await registerPage.fillCustomDate(customDate);
  });

  await test.step("Click Register User button", async () => {
    await registerPage.clickBtnSubmit();

    await expect(
      await registerPage.getLocator(`//td[text() = '${username}']`)
    ).toBeVisible();

    await expect(
      await registerPage.getLocator(`//td[text() = '${email}']`)
    ).toBeVisible();

    const info = await registerPage.getTextContent(
      `//td[text() = '${email}']/following-sibling::td[contains(., 'Gender')]`
    );
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
