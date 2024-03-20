import request from "supertest";
import app from "../src/app";

describe("Test app.ts", () => {
  test("Catch-all route", async () => {
    const res = await request(app).get("/");
    expect(res.body).toEqual({ message: 'here we go, yo' });
  });
  
  test("stage 1", async () => {
    const url = 'http://localhost:3000/v1/api/forms/cLZojxk94ous/submissions';
    const res = await request(app).get(url);
    expect(res.body).toEqual({ message: 'here we go, yo' });
  });
});