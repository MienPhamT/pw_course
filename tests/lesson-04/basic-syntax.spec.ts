import { test } from '@playwright/test';

test("Basic syntax", async ({ page }) => {
    // code here
    await test.step("Go to website", async () => {
        // Goto tiki.vn
        await page.goto("https://tiki.vn/");
    });

    await test.step("Click top deal", async () => {
        // single click
        await page.locator('//a[contains(@href, "SANPHAMBANCHAY")]').click();

        // double click
        await page.locator('//a[contains(@href, "SANPHAMBANCHAY")]').dblclick();

        // Click count: vd: Click 5 lan
        await page.locator('//a[contains(@href, "SANPHAMBANCHAY")]').click({ clickCount: 5 });

        // right click
        await page.locator('//a[contains(@href, "SANPHAMBANCHAY")]').click({ button: 'right' });

        // Click kèm bàn phím khác:
        await page.locator('//a[contains(@href, "SANPHAMBANCHAY")]').click({ modifiers: ["Alt", "Control"] });
    });

    //Select Option
    await test.step("Select option", async () => {
        await page.selectOption('//select[@id= "country"]', 'Canada');
    });

    // Input File
    await test.step("Input file", async () => {
        await page.locator('//input[@type = "file"]').setInputFiles("tests/new-file.txt");
    });
})