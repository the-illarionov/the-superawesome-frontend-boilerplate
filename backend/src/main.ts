import express from "express"

const app = express()

app.get("/", (req, res) => {
	console.log(req)
	res.send("hello")
})

app.listen(80, () => {
	console.log("Server is listening on 80...")
})
