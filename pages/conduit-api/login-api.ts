import { APIRequestContext } from "@playwright/test";
import { BaseAPI } from "./base-API";

export class LoginAPI extends BaseAPI {
    constructor(request: APIRequestContext) {
        super(request);
    }

    /**
     * Login into the Conduit website
     * @param email - User's registered email address
     * @param password - User's password
     * @returns Promise resolving to API response with user data and authentication token
     */
    async logIn(email: string, password: string) {
        const endpointLogin = "api/users/login";
        const res = await this.post(endpointLogin, {
            user: {
                "email": email,
                "password": password,
            }
        });
        return res;
    }
}