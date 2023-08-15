// REST API using MongoDb
// imports
const cors = require("cors")
require("dotenv").config()
const { format } = require("date-fns")
const express = require("express")
const Routes = require("./routes/routes")
const { mongoose } = require("mongoose")
// constants
const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 3000

// express app
const app = express()

// middleware
app.use(cors()) // let's you acces the API from anywhere
app.use(express.json()) // adds body to request (req.body)
app.use((req, _, next) => {
  const currentDate = format(new Date(), "HH:mm:ss dd/MM/yyyy")
  console.log(req.method, req.path, currentDate)
  next()
})

const apiPathName = "users"
const fullPath = `/api/${apiPathName}/`

//routes
app.use(fullPath, Routes)

// connect to db and start the server
async function connectDb() {
  try {
    await mongoose.connect(MONGO_URI)
    // Start the server just after the connection to the DB
    app.listen(PORT, () => {
      console.log(
        `Server is connected to db & running on http://localhost:${PORT}`,
      )
    })
  } catch (error) {
    console.error(error)
  }
}
connectDb()

app.get("/", (_, res) => {
  res.json({ mssg: `Use ${fullPath} for this API ` })
  res.redirect(fullPath)
})
