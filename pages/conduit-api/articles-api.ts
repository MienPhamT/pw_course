import { APIRequestContext } from "@playwright/test";
import { BaseAPI } from "./base-API";

export class AddArticles extends BaseAPI {
    constructor(request: APIRequestContext) {
        super(request);
    }

    /**
     * Creates a new article with the specified content
     * @param token - User authentication token (required for article creation)
     * @param title - Article title (required)
     * @param description - Article description (required)
     * @param body - Article body content (required)
     * @param tagList - Array of tags for the article (optional)
     * @returns Promise resolving to API response with created article data
     */
    async addArticle(token: string, title: string, description: string, body: string, tagList: string[]) {
        const endpointAddArticle = "api/articles/";
        const res = await this.post(endpointAddArticle,
            {
                article: {
                    title: title,
                    description: description,
                    body: body,
                    tagList: tagList
                }
            },
            {
                authorization: `Token ${token}`
            }
        );
        return res;
    }
}


export class AddComment extends BaseAPI {
    constructor(request: APIRequestContext) {
        super(request);
    }
    /**
     * Adds a comment to a specific article
     * @param token - User authentication token (required for comment creation)
     * @param slug - Article slug identifier (required)
     * @param comment - Comment body text (required)
     * @returns Promise resolving to API response with created comment data
     */
    async addComment(token: string, slug: string, comment: string) {
        const endpoint = `api/articles/${slug}/comments`;

        const res = await this.post(endpoint,
            {
                "comment": {
                    "body": comment
                }
            },
            {
                authorization: `Token ${token}`
            }
        );
        return res;
    }
}

export class DeleteComment extends BaseAPI {
    constructor(request: APIRequestContext) {
        super(request);
    }

    /**
     * Deletes a specific comment from an article
     * @param token - User authentication token (required for comment deletion)
     * @param slug - Article slug identifier (required)
     * @param commentID - Comment ID to delete (required)
     * @returns Promise resolving to API response (204 No Content on success)
     */
    async deleteComment(token: string, slug: string, commentID: string) {
        const endpoint = `api/articles/${slug}/comments/${commentID}`;
        await this.delete(endpoint,
            {
                authorization: `Token ${token}`
            }
        );
    }
}

export class DeleteArticle extends BaseAPI {
    constructor(request: APIRequestContext) {
        super(request);
    }

    /**
     * Deletes a specific article
     * @param token - User authentication token (required for article deletion)
     * @param slug - Article slug identifier (required)
     * @returns Promise resolving to API response (204 No Content on success)
     */
    async deleteArticle(token: string, slug: string) {
        const endpoint = `api/articles/${slug}`;
        await this.delete(endpoint,
            {
                authorization: `Token ${token}`
            }
        );
    }
}
