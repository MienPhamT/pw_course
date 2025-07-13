import { APIRequestContext, expect } from "@playwright/test";

export class ConduitAPI {
    request: APIRequestContext;
    url: string;
    token: string;

    constructor(request: APIRequestContext, url: string) {
        this.request = request;
        this.url = url;
    }

    // Login to conduit page
    async loginConduitPage(userCredential: {
        email: string;
        password: string;
    }): Promise<string> {
        const res = await this.request.post(`${this.url}/api/users/login`, {
            data: {
                user: {
                    email: userCredential.email,
                    password: userCredential.password,
                },
            },
        });
        expect(res.status()).toBe(200);
        const resBody = await res.json();
        const token = resBody.user.token;
        this.token = token;
        return token;
    }

    // Create new article
    async createNewArticle(articleInfo: {
        title: string;
        description: string;
        body: string;
        tagList: string[];
    }): Promise<any> {
        const res = await this.request.post(`${this.url}/api/articles`, {
            headers: {
                Authorization: `Token ${this.token}`,
            },
            data: {
                article: articleInfo,
            },
        });
        const resBody = await res.json();
        expect(res.status()).toBe(201);
        return resBody;
    }

    // Get article's info by article's title
    async getArticleInfoByTitle(articleTitle: string) {
        const res = await this.request.get(`${this.url}/api/articles`, {
            headers: {
                Authorization: `Token ${this.token}`,
            },
        });
        expect(res.status()).toBe(200);
        const resBody = await res.json();
        const articleInfo = resBody.articles.find(
            (article) => article.title === articleTitle
        );
        return articleInfo;
    }

    // Delete an article
    async deleteArticle(articleSlug: string): Promise<void> {
        const res = await this.request.delete(
            `${this.url}/api/articles/${articleSlug}`,
            {
                headers: {
                    Authorization: `Token ${this.token}`,
                },
            }
        );
        expect(res.status()).toBe(204);
    }
}
