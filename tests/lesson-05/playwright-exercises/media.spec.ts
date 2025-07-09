import test, { expect } from "@playwright/test";
import { LoginPage } from "../../../practice-playwrightvn-pages/login-page";
import { MediaPage } from "../../../practice-playwrightvn-pages/media-page";

test.describe("MEDIA - media", async () => {
    const url = "https://pw-practice-dev.playwrightvn.com/login"
    const validUsername = "p103-mien";
    const validPassword = "ID9Zz)a0kKq#39LB#8so)(YN";

    let loginPage: LoginPage;
    let mediaPage: MediaPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        // Sử dụng loginAndGoToMedia để trả về MediaPage
        mediaPage = await loginPage.loginAndGoToMedia(validUsername, validPassword);
        await loginPage.navigateToMenuItem(mediaPage.xpathMediaMenuItem);
    })

    test("@MEDIA_FILES_001 - Media - upload file success", async ({ page }) => {
        await test.step("Upload file", async () => {
            await mediaPage.clickAddMediaFileBtn();
            await mediaPage.uploadFile();

            const file = await mediaPage.getUploadFileLocator();
            await expect(file).toBeVisible();
        });

        await test.step("Refresh page", async () => {
            await mediaPage.refreshPage();

            const file = await mediaPage.getUploadFileLocator();
            await expect(file).toBeVisible();
        });

        await test.step("Delete file", async () => {
            await mediaPage.clickToNewUploadFile();

            page.on("dialog", async (dialog) => {
                await dialog.accept();
            });

            await mediaPage.deleteFile();

            const file = await mediaPage.getUploadFileLocator();
            await expect(file).not.toBeVisible();
        });
    });
});