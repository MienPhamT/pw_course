import { APIRequestContext } from "@playwright/test";
import { BaseAPI } from "./base-API";

export class RegisterAPI extends BaseAPI {
    constructor(request: APIRequestContext) {
        super(request);
    }

    /**
     * Registers a new user in the Conduit website
     * @param username - User's desired username (must be unique)
     * @param email - User's email address (must be unique)
     * @param password - User's password (minimum 8 characters recommended)
     * @returns Promise resolving to API response with user data and token
     */
    async signUp(userName: string, email: string, password: string) {
        const endpointSignUp = "api/users";
        const res = await this.post(endpointSignUp, {
            user: {
                "email": email,
                "password": password,
                "username": userName
            }
        });
        return res;
    }
}