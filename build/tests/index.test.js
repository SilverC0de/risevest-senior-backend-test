"use strict";
const request = require("supertest");
const app = require('../src/index');
describe("Check is its running", () => {
    test("GET /", (done) => {
        request(app)
            .get("/")
            .expect("Content-Type", /json/)
            .expect(200);
    });
});
describe("Check top 3", () => {
    test("GET /top3", (done) => {
        request(app)
            .get("/")
            .expect("Content-Type", /json/)
            .expect(200);
    });
});
