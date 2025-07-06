import test, { APIResponse, expect } from "@playwright/test";
import { url } from "inspector";

test.describe("API", async () => {
    const baseURL = "https://conduit-api.bondaracademy.com/";
    let token;
    test("automated API test", async ({ request }) => {
        await test.step("Get articles", async () => {
            const endpoint: string = "api/articles?limit=10&offset=0";
            const response: APIResponse = await request.get(baseURL + endpoint);

            const resStatus: number = response.status();
            expect(resStatus).toEqual(200);

            const resBody = await response.json();
            console.log(resBody);

            const articleCount = resBody.articles.length;
            expect(articleCount).toEqual(10);
        });
    })

    test("Login", async ({ request }) => {
        await test.step("Get articles", async () => {
            const endpoint: string = "api/users/login";
            const response: APIResponse = await request.get(baseURL + endpoint, {

            });

            const resStatus: number = response.status();
            expect(resStatus).toEqual(200);

            const resBody = await response.json();
            console.log(resBody);

            const articleCount = resBody.articles.length;
            expect(articleCount).toEqual(10);
        });
    })
})