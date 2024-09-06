require("dotenv").config()
const express = require("express")
const cors = require("cors")
const dbconn = require("./configs/dbconn")
const initRoutes = require("./routes")

const app = express()
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET", "PATCH", "DELETE"],
  })
)
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

initRoutes(app)
dbconn()

const port = process.env.PORT || 8888
const listener = app.listen(port, () => {
  console.log(`Server is running on the port ${listener.address().port}`)
})
