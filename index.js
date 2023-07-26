// REST API using MongoDb
// imports
const cors = require("cors")
require("dotenv").config()
const { format } = require("date-fns")
const express = require("express")
const YourRoutes = require("./routes/routes")
const { mongoose } = require("mongoose")
// constants
const MONGO_URI = process.env.MONGO_URI // get the uri from MongoDb Atlas
const PORT = process.env.PORT || 3000

// express app
const app = express()

// middleware
app.use(cors())
app.use(express.json()) // adds body to request (req.body)
app.use((req, _, next) => {
  const currentDate = format(new Date(), "HH:mm:ss dd/MM/yyyy")
  console.log(req.method, req.path, currentDate)
  next()
})

const apiPathName = "users"
const fullPath = `/api/${apiPathName}/`

//routes
app.use(fullPath, YourRoutes)

// connect to db and start the server
if (MONGO_URI) {
  async function connectDb() {
    try {
      await mongoose.connect(MONGO_URI)
      // Start the server just after the connection to the DB
      app.listen(PORT, () => {
        console.log(`Server is connected to db & running on http://localhost:${PORT}`)
      })
    } catch (error) {
      console.error(error)
    }
  }
  connectDb()
} else {
  // Just for testing purposes
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}

app.get("/", (_, res) => {
  res.json({ mssg: `Use ${fullPath} for this API ` })
  res.redirect(fullPath)
})
