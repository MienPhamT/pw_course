// idea: viet 1 fixture doc thong tin config trong env

import { test as base } from '@playwright/test';

class EnvConf {
    getKey(keyPrefix: string) {
        let keyPostFix = "_PROD";

        if (process.env.ENV === "dev") {
            keyPostFix = "_DEV";
        }

        return `${keyPrefix}${keyPostFix}`;
    }
}

const test = base.extend<{ envConfig: EnvConf }>({
    envConfig: async ({ }, use) => {
        const envConfig = new EnvConf();
        await use(envConfig);
    }
})

export { test };