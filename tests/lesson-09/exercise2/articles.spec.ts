import { expect } from "@playwright/test";
import { test } from "./fixtures/my-api";
import { ConduitAPI } from "./conduit";

test.describe("Articles", () => {
    test("Check articles created by fixture", async ({ request, myApi }) => {
        const conduitAPI = new ConduitAPI(request, "https://conduit-api.bondaracademy.com");
        const token = await conduitAPI.loginConduitPage({
            email: "mia.phamm@gmail.commmmm",
            password: "mia123456",
        });
        conduitAPI.token = token;

        for (const title of ["a1", "a2"]) {
            const article = await conduitAPI.getArticleInfoByTitle(title);
            expect(article).toBeTruthy();
        }
    });
});