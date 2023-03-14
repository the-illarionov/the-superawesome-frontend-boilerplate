import express from "express"

const app = express()

app.get("/api/user", (req, res) => {
	res.json({
		name: "Alex",
		role: "Developer",
	})
})

app.listen(80, () => {
	console.log("Server is listening on 80...")
})

export { app }
