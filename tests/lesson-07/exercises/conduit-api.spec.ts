import test, { expect } from "@playwright/test";
import { RegisterAPI } from "../../../pages/conduit-api/register-api";
import { LoginAPI } from "../../../pages/conduit-api/login-api";
import { AddArticles, AddComment, DeleteComment, DeleteArticle } from "../../../pages/conduit-api/articles-api";

test.describe("Automated API", async () => {
    const userName = "miamiamia";
    const password = "mia123456";
    const email = "mia.phamm@gmail.commmmm";
    const title = "API in Playwright Mia ";
    const description = "API in Playwright";
    const body = "How to use Playwright to create article";
    const tagList = ["Playwright in Viet Nam", "pw", "pw-k6"];
    let token = "";
    let articleSlug = "";
    let commentID: string[] = [];

    test("Signup API", async ({ request }) => {
        let registerAPI = new RegisterAPI(request)

        await test.step("Sign up API", async () => {
            const response = await registerAPI.signUp(userName, email, password);

            const statusCode: number = response.status();
            expect(statusCode).toEqual(201);

            const resBody = await response.json();
            const token = resBody.user.token;
            expect(token).toBeTruthy();
        })
    })

    test("Add Article", async ({ request }) => {

        let loginAPI = new LoginAPI(request);
        let addArticle = new AddArticles(request);

        await test.step("Login", async () => {
            const res = await loginAPI.logIn(email, password);
            const resBody = await res.json();
            token = resBody.user.token;
        })

        await test.step("Add Articles", async () => {
            const res = await addArticle.addArticle(token, title, description, body, tagList);
            const resBody = await res.json();
            articleSlug = resBody.article.slug;
        })
    })

    test("Add comment", async ({ request }) => {
        let addComment = new AddComment(request);
        await test.step("Add 5 comment to article", async () => {
            for (let i = 1; i <= 5; i++) {
                const res = await addComment.addComment(token, articleSlug, `Comment 0${i}`);
                const resBody = await res.json();
                commentID.push(resBody.comment.id);
            }
        })
    })

    test("Delete comment", async ({ request }) => {
        let deleteComment = new DeleteComment(request);
        await test.step("Delete comment", async () => {
            await deleteComment.deleteComment(token, articleSlug, commentID[1]);
            await deleteComment.deleteComment(token, articleSlug, commentID[4]);
        })
    })

    test("Delete articles", async ({ request }) => {
        let deleteArticle = new DeleteArticle(request);
        await test.step("Delete article", async () => {
            await deleteArticle.deleteArticle(token, articleSlug);
        })
    })
})
