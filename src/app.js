const express = require("express")
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.routes.js")
const app = express()

app.use(cookieParser())
app.use(express.json());

const accountRouter = require("./routes/account.routes.js")


app.use("/api/auth", authRouter)
app.use("/api/account", accountRouter)



module.exports = app