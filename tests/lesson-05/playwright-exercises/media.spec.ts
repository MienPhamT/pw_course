import test, { expect } from "@playwright/test";
import { LoginPage } from "../../../practice-playwrightvn-pages/login-page";
import { MediaPage } from "../../../practice-playwrightvn-pages/media-page";

test.describe("MEDIA - media", async () => {
    const loginUrl = "https://pw-practice-dev.playwrightvn.com/login";
    const validUsername = "p103-mien";
    const validPassword = "ID9Zz)a0kKq#39LB#8so)(YN";

    const xpathMediaMenuItem = "//a/div[text() = 'Media']";
    const xpathUploadedFile = "//div[@class='filename']/div[text()='mia.txt']//ancestor::li";

    let loginPage: LoginPage;
    let mediaPage: MediaPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(loginUrl, page);
        mediaPage = new MediaPage(page);

        await loginPage.loginToSite(validUsername, validPassword);
        await mediaPage.goToPage(xpathMediaMenuItem);
    })

    test("@MEDIA_FILES_001 - Media - upload file success", async ({ page }) => {
        await test.step("Upload file", async () => {
            await mediaPage.clickAddMediaFileBtn();
            await mediaPage.setFileInput();

            const file = await mediaPage.getLocator(xpathUploadedFile);
            await expect(file).toBeVisible();
        });

        await test.step("Refresh page", async () => {
            await mediaPage.refreshPage();

            const file = await mediaPage.getLocator(xpathUploadedFile);
            await expect(file).toBeVisible();
        });

        await test.step("Delete file", async () => {
            await mediaPage.clickToNewUploadFile(xpathUploadedFile);

            page.on("dialog", async (dialog) => {
                await dialog.accept();
            });

            await mediaPage.deleteFile();

            const file = page.locator(xpathUploadedFile);
            await expect(file).not.toBeVisible();
        });
    });
});