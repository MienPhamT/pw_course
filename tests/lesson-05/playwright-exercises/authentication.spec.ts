import { expect, test } from "@playwright/test";
import { LoginPage } from "../../../practice-playwrightvn-pages/login-page";

test.describe("AUTH - Authentication", async () => {
    const incorrectUsername = "miamiaa";
    const incorrectPassword = "123456";
    const validUsername = "p103-mien";
    const validPassword = "ID9Zz)a0kKq#39LB#8so)(YN";

    const expectErrorMsg = `Error: The username ${incorrectUsername} is not registered on this site. If you are unsure of your username, try your email address instead.`;
    const expectDashboardUrl = "https://pw-practice-dev.playwrightvn.com/wp-admin/";

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goToWebsite();
    });

    test("@AUTH_001 - Login fail", async ({ page }) => {
        await test.step("Input the incorrect username, password", async () => {
            await loginPage.fillUserName(incorrectUsername);
            await loginPage.fillPassword(incorrectPassword);

            const actualUsername = await loginPage.getCurrentUsername();
            const actualPW = await loginPage.getCurrentPassword();

            expect(actualUsername).toBe(incorrectUsername);
            expect(actualPW).toBe(incorrectPassword);
        });

        await test.step("Click button login", async () => {
            await loginPage.clickBtnLogin();

            const actualErrorMsg = await loginPage.getLoginErrorMsg();
            expect(expectErrorMsg).toBe(actualErrorMsg);
        });
    });

    test("@AUTH_002 - Login success", async ({ page }) => {
        await test.step("Input the correct username, password", async () => {
            await loginPage.fillUserName(validUsername);
            await loginPage.fillPassword(validPassword);

            const actualUsername = await loginPage.getCurrentUsername();
            const actualPW = await loginPage.getCurrentPassword();

            expect(actualUsername).toBe(validUsername);
            expect(actualPW).toBe(validPassword);
        });

        await test.step("Click button login", async () => {
            await loginPage.clickBtnLogin();

            const currentUrl = await loginPage.getUrl();
            expect(currentUrl).toBe(expectDashboardUrl);

            await expect(loginPage.getDashboardHeadingLocator()).toBeVisible();
            await expect(loginPage.getAtAGlanceLocator()).toBeVisible();
            await expect(loginPage.getActivityLocator()).toBeVisible();
        });
    });
});