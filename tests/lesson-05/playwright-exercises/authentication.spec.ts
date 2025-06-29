import { expect, test } from "@playwright/test";
import { assert } from "console";

test.describe("AUTH - Authentication", async () => {
    const loginUrl = "https://pw-practice-dev.playwrightvn.com/login";
    const incorrectUsername = "miamiaa";
    const incorrectPassword = "123456";
    const validUsername = "p103-mien";
    const validPassword = "ID9Zz)a0kKq#39LB#8so)(YN";

    const expectHeadingDashboard = "Dashboard";
    const expectHeadingAtaGlance = "At a Glance";
    const expectHeadingActivity = "Activity";
    const expectErrorMsg = `Error: The username ${incorrectUsername} is not registered on this site. If you are unsure of your username, try your email address instead.`;
    const expectDashboardUrl = "https://pw-practice-dev.playwrightvn.com/wp-admin/";

    const $usernameInput = "//input[@id = 'user_login']";
    const $passwordInput = "//input[@id = 'user_pass']";
    const $loginButton = "//input[@id = 'wp-submit']";
    const $loginErrorMsg = "//div[@id = 'login_error']/p";
    const $headingDashboard = "//div[@class = 'wrap']/h1";
    const $headingAtaGlance = "//h2[normalize-space() = 'At a Glance']";
    const $headingActivity = "//h2[normalize-space() = 'Activity']";

    async function inputLoginCredential(page, usernameLocation, username, pwLocation, password) {
        await page.locator(usernameLocation).fill(username);
        await page.locator(pwLocation).fill(password);
    };

    async function verifyInputSuccess(page, username, password) {
        const actualUsername = await page.locator($usernameInput).inputValue();
        expect(actualUsername).toBe(username);

        const actualPW = await page.locator($passwordInput).inputValue();
        expect(actualPW).toBe(password);
    };

    test.beforeEach(async ({ page }) => {
        await page.goto(loginUrl);
    });

    test("@AUTH_001 - Login fail", async ({ page }) => {
        await test.step("Input the incorrect username, password", async () => {
            await inputLoginCredential(page, $usernameInput, incorrectUsername, $passwordInput, incorrectPassword);
            await verifyInputSuccess(page, incorrectUsername, incorrectPassword);
        });

        await test.step("Click button login", async () => {
            await page.locator($loginButton).click();

            const actualErrorMsg = page.locator($loginErrorMsg).textContent();
            expect(actualErrorMsg).toBe(expectErrorMsg);
        });

    });

    test("@AUTH_002 - Login success", async ({ page }) => {
        await test.step("Input the correct username, password", async () => {
            await inputLoginCredential(page, $usernameInput, validUsername, $passwordInput, validPassword);
            await verifyInputSuccess(page, validUsername, validPassword);
        });

        await test.step("Click button login", async () => {
            await page.locator($loginButton).click();

            const currentUrl = await page.url();
            expect(currentUrl).toBe(expectDashboardUrl);

            const actualHeadingDash = await page.locator($headingDashboard).textContent();
            expect(actualHeadingDash).toBe(expectHeadingDashboard);

            const actualHeadingAtaGlance = await page.locator($headingAtaGlance).textContent();
            expect(actualHeadingAtaGlance).toBe(expectHeadingAtaGlance);

            const actualHeadingActivity = await page.locator($headingActivity).textContent();
            expect(actualHeadingActivity).toBe(expectHeadingActivity);
        });
    });
});