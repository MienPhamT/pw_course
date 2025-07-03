import test, { expect } from "@playwright/test";

test.describe("MEDIA - media", async () => {
    const loginUrl = "https://pw-practice-dev.playwrightvn.com/login";
    const validUsername = "p103-mien";
    const validPassword = "ID9Zz)a0kKq#39LB#8so)(YN";
    const filePath = "tests/lesson-05/playwright-exercises/mia.txt";

    const $usernameInput = "//input[@id = 'user_login']";
    const $passwordInput = "//input[@id = 'user_pass']";
    const $loginButton = "//input[@id = 'wp-submit']";
    const $mediaMenuItem = "//a/div[text() = 'Media']";
    const $addMediaBtn = "//a[@role = 'button' and text() = 'Add Media File']";
    const $fileInput = 'input[type="file"]';
    const $firstFileinList = '(//ul[contains(@class, "attachments")]//li)[1]'
    const $uploadedFile = "//div[@class='filename']/div[text()='mia.txt']";
    const $deleteButton = "//button[@class = 'button-link delete-attachment']";

    test.beforeEach(async ({ page }) => {
        await page.goto(loginUrl);
        await page.locator($usernameInput).fill(validUsername);
        await page.locator($passwordInput).fill(validPassword);
        await page.locator($loginButton).click();

        await page.locator($mediaMenuItem).click();
    })

    test("@MEDIA_FILES_001 - Media - upload file success", async ({ page }) => {
        await test.step("Upload file", async () => {
            await page.locator($addMediaBtn).click();
            await page.locator($fileInput).setInputFiles(filePath);

            const file = page.locator($uploadedFile);
            await expect(file).toBeVisible();
        });

        await test.step("Refresh page", async () => {
            await page.reload();

            const file = page.locator($uploadedFile);
            await expect(file).toBeVisible();
        });

        await test.step("Delete file", async () => {
            await page.locator($firstFileinList).click();

            page.on("dialog", async (dialog) => {
                await dialog.accept();
            });

            await page.locator($deleteButton).click();

            const file = page.locator($uploadedFile);
            await expect(file).not.toBeVisible();
        });
    });
});