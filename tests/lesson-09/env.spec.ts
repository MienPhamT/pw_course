import test from "node:test";

test("ENV", async () => {
    console.log(process.env.ENV);
    let loadingTime;
    if (process.env.ENV === "dev") {
        loadingTime = process.env.LOADING_TIME_DEV;
    }
    else loadingTime = process.env.LOADING_TIME_PROD;

    console.log(loadingTime);
})