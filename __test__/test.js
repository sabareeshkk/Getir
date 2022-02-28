const request = require("supertest")
const app = require("../app");
// const db = require("./config/database");

const agent = request.agent(app);

// beforeAll(async () => await db.connect());
// afterEach(async () => await db.clear());
// afterAll(async () => await db.close());

describe("Records", () => {
    describe("POST /v1/records", () => {
        test("successful", async () => {
            const res = await agent.post("/v1/records").send({
                "startDate": "2016-01-26",
                "endDate": "2018-02-02",
                "minCount": 2700,
                "maxCount": 3000
            });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeTruthy();
        });
    });
});