import { test } from "@playwright/test";

test.describe("AUTH - Authentication", async () => {
    const incorrectUsername = "miamiaa";
    const incorrectPassword = "123456";
    const validUsername = "miamia";
    const validPassword = "1234567";
    const usernameInput = "input[@id = 'user_login']";
    const passwordInput = "input[@id = 'user_login']";

    test.beforeEach(async ({ page }) => {
        await page.goto("https://pw-practice-dev.playwrightvn.com/");
    });

    test("@AUTH_001 - Login fail", async ({ page }) => {
        await test.step("Input the incorrect username, password", async () => {

        })
    })

    test("@AUTH_002 - Login success", async ({ page }) => {

    })

})