const express = require("express")
const {
  getAll,
  getOne,
  postOne,
  postMany,
  deleteOne,
  deleteAll,
  updateOne,
} = require("../controllers/controllers")
// Import middleware for requiring authentication
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

// Apply the requireAuth middleware to protect all routes below
router.use(requireAuth)

// get all
router.get("/", getAll)

// get one
router.get("/:id", getOne)

// post one
router.post("/", postOne)

// post many
router.post("/many", postMany)

// delete all
router.delete("/all", deleteAll)

// delete one
router.delete("/:id", deleteOne)

// update one
router.patch("/:id", updateOne)

module.exports = router
