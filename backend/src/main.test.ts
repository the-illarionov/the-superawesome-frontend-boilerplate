import { app } from "./main"
import request from "supertest"

describe("Test suite", () => {
	it("Test case", async () => {
		const response = await request(app).get("/api/user")

		expect(response.body).toStrictEqual({ name: "Alex", role: "Developer" })
	})
})

export {}
