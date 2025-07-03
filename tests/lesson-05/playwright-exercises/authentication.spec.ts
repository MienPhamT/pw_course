import { expect, test } from "@playwright/test";
import { assert } from "console";
import { LoginPage } from "../../../practice-playwrightvn-pages/login-page";

test.describe("AUTH - Authentication", async () => {
    const loginUrl = "https://pw-practice-dev.playwrightvn.com/login";
    const incorrectUsername = "miamiaa";
    const incorrectPassword = "123456";
    const validUsername = "p103-mien";
    const validPassword = "ID9Zz)a0kKq#39LB#8so)(YN";

    const expectErrorMsg = `Error: The username ${incorrectUsername} is not registered on this site. If you are unsure of your username, try your email address instead.`;
    const expectDashboardUrl = "https://pw-practice-dev.playwrightvn.com/wp-admin/";

    let xpathHeadingDashboard = "//div[@class = 'wrap']/h1";
    let xpathHeadingAtaGlance = "//h2[normalize-space() = 'At a Glance']";
    let xpathHeadingActivity = "//h2[normalize-space() = 'Activity']";
    let xpathLoginErrorMsg = "//div[@id = 'login_error']/p";

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(loginUrl, page)
        await loginPage.goToWebsite();
    });

    test("@AUTH_001 - Login fail", async ({ page }) => {
        await test.step("Input the incorrect username, password", async () => {
            await loginPage.fillUserName(incorrectUsername);
            await loginPage.fillPassword(incorrectPassword);

            const actualUsername = await loginPage.getInputValue(loginPage.xpathUsernameInput);
            expect(actualUsername).toBe(incorrectUsername);

            const actualPW = await loginPage.getInputValue(loginPage.xpathPasswordInput);
            expect(actualPW).toBe(incorrectPassword);
        });

        await test.step("Click button login", async () => {
            await loginPage.clickBtnLogin();

            const actualErrorMsg = await loginPage.getTextContent(xpathLoginErrorMsg);
            expect(expectErrorMsg).toBe(actualErrorMsg);
        });

    });

    test("@AUTH_002 - Login success", async ({ page }) => {
        await test.step("Input the correct username, password", async () => {
            await loginPage.fillUserName(validUsername);
            await loginPage.fillPassword(validPassword);

            const actualUsername = await loginPage.getInputValue(loginPage.xpathUsernameInput);
            expect(actualUsername).toBe(validUsername);

            const actualPW = await loginPage.getInputValue(loginPage.xpathPasswordInput);
            expect(actualPW).toBe(validPassword);
        });

        await test.step("Click button login", async () => {
            await loginPage.clickBtnLogin();

            const currentUrl = await loginPage.getUrl();
            expect(currentUrl).toBe(expectDashboardUrl);

            await expect(await loginPage.getLocator(xpathHeadingDashboard)).toBeVisible();
            await expect(await loginPage.getLocator(xpathHeadingAtaGlance)).toBeVisible();
            await expect(await loginPage.getLocator(xpathHeadingActivity)).toBeVisible();
        });
    });
});