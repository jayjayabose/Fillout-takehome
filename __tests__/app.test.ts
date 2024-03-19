import request from "supertest";

import app from "../src/app";

// const request = require("supertest");

// const app = require("../src/app");

describe("Test app.ts", () => {
  test("Catch-all route", async () => {
    const res = await request(app).get("/");
    expect(res.body).toEqual({ message: 'here we go, yo' });
  });
});