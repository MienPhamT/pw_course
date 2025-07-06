import { APIRequestContext } from "@playwright/test";

export class BaseAPI {
    protected request: APIRequestContext;
    protected baseUrl: string;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.baseUrl = "https://conduit-api.bondaracademy.com/";
    }

    async makeRequest(
        method: 'get' | 'post' | 'delete',
        endpoint: string,
        data?: any,
        headers?: Record<string, string>
    ) {
        const url = `${this.baseUrl}${endpoint}`;
        const response = await this.request[method](url, {
            data,
            headers,
            timeout: 30000
        });

        return response;
    }

    async post(endpoint: string, data?: any, headers?: Record<string, string>) {
        return this.makeRequest('post', endpoint, data, headers);
    }

    async get(endpoint: string, headers?: Record<string, string>) {
        return this.makeRequest('get', endpoint, undefined, headers);
    }

    async delete(endpoint: string, headers?: Record<string, string>) {
        return this.makeRequest('delete', endpoint, undefined, headers);
    }
}