import { test as base } from "@playwright/test";
import { ConduitAPI } from "../conduit";

const test = base.extend<{ myApi: void }>({
    async myApi({ request }, use) {
        const url = "https://conduit-api.bondaracademy.com";
        const userCredential = {
            email: "mia.phamm@gmail.commmmm",
            password: "mia123456",
        };
        const conduitAPI = new ConduitAPI(request, url);

        // 1. Login và lưu token
        const token = await conduitAPI.loginConduitPage(userCredential);
        conduitAPI.token = token;

        // 2. Tạo 2 article a1, a2
        const createdArticles: string[] = [];
        for (const title of ["a1", "a2"]) {
            const article = await conduitAPI.createNewArticle({
                title,
                description: "desc " + title,
                body: "body " + title,
                tagList: [],
            });
            createdArticles.push(article.article.slug);
        }

        // Cho test chạy
        await use();

        // 3. Xóa 2 article sau test
        for (const slug of createdArticles) {
            await conduitAPI.deleteArticle(slug);
        }
    },
});

export { test }; 