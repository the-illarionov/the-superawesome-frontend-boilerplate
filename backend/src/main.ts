import express from "express"

const app = express()

app.get("/api/user", (req, res) => {
	res.json({
		name: "Alex",
		role: "Developer",
	})

	console.log(req)
})

app.listen(80, () => {
	console.log("Server is listening on 80...")
})
