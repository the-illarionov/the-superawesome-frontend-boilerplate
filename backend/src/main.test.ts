import { app } from "./main"
import request from "supertest"

describe("Test suite", () => {
	it("Test case", async () => {
		const response = await request(app).post("/api/login").send({ username: "foo", password: "bar" })

		expect(response.body).toStrictEqual({ token: "some-auth-token" })
	})
})

export {}
