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

const router = express.Router()

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
