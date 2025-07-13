// idea: viet 1 fixture doc thong tin config trong env
import * as dotenv from 'dotenv';
dotenv.config();

export class EnvConf {
    static getBaseUrl(): string {
        const env = process.env.ENV || 'dev';
        if (env === 'prod') {
            return process.env.BASE_URL_PROD!;
        }
        return process.env.BASE_URL_DEV!;
    }
}