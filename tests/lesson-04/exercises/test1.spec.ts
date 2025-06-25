import test from "@playwright/test";

test("User Registration", async ({ page }) => {
  await test.step("Go to Website", async () => {
    await page.goto("https://material.playwrightvn.com/");
  });

  await test.step("Click Bai Hoc 1", async () => {
    await page.locator('//a[contains(@href,  "register-page")]').click();
  });

  await test.step("Fill User Registration form", async () => {
    await page.locator('//input[@id = "username"]').fill("Mia Mia");
    await page.locator('//input[@id = "email"]').fill("mia+2@gmail.com");
    await page.locator('//input[@id = "female"]').check();
    await page.locator('//input[@id = "reading"]').check();
    await page.selectOption("select#interests", "art");
    await page.selectOption("select#country", "canada");
    await page.locator('//input[@id = "dob"]').fill("2000-04-12");
    await page
      .locator('//input[@id = "profile"]')
      .setInputFiles("tests/lesson-04/exercises/profile.txt");
    await page.locator('//textarea[@id = "bio"]').fill("hello guys, i'm mia");
    await page.locator('//input[@id ="rating"]').fill("8");
    await page.locator('//div[@class = "tooltip"]').hover();
    await page.locator('//input[@id = "newsletter"]').check();
    await page.locator('//label[@class="switch"]').click();

    // Star rating
    const starBox = await page.locator('//div[@id="starRating"]');
    const box = await starBox.boundingBox(); // bounding Box trả về tọa độ và kích thước của locator trên trang web

    if (box) {
      const percent = 80;
      const xOffset = (percent / 100) * box.width;
      await page.mouse.click(box.x + xOffset, box.y + box.height / 2);
    }

    // Custom date (need to remove readonly before fill )
    await page
      .locator('//input[@id="customDate"]')
      .evaluate((el) => el.removeAttribute("readonly"));
    await page.locator('//input[@id="customDate"]').fill("2020-04-12");
  });

  await test.step("Click Register User button", async () => {
    await page.locator('//button[@type = "submit"]').click();
  });
});
