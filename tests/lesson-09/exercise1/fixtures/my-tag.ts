import { EnvConf } from "./env-conf";
import { LoginPage } from "../pages/login-page";
import { PostPage } from "../pages/post-page";
import { test as base } from "@playwright/test";

const test = base.extend<{ myTag: void }>({
    async myTag({ page }, use) {
        const url = EnvConf.getBaseUrl();
        const validUsername = "p103-mien";
        const validPassword = "ID9Zz)a0kKq#39LB#8so)(YN";
        const loginPage = new LoginPage(page);
        const postPage = new PostPage(page);
        await page.goto(url);
        await loginPage.login(validUsername, validPassword);
        await postPage.gotoTagPage();
        for (const tag of ["t1", "t2"]) await postPage.addTag(tag);
        await use();
        for (const tag of ["t1", "t2"]) await postPage.deleteTag(tag);
    },
});

export { test };