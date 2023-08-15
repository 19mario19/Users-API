const User = require("../models/model")
const getIdAndCheck = require("../functions/getIdAndCheck")
const handleDataNotFound = require("../functions/handleDataNotFound")

// get all
async function getAll(_, res) {
  try {
    const users = await User.find({}).sort({ createdAt: -1 })
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
// get one
async function getOne(req, res) {
  try {
    const id = getIdAndCheck(req)
    const user = await User.findById({ _id: id })
    handleDataNotFound(res, user)
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
// post one
async function postOne(req, res) {
  const { first_name, last_name, age, city, email } = req.body
  const emptyFields = []

  const list = ["first_name", "last_name", "age", "city", "email"]
  list.forEach((property) => {
    if (!req.body[property]) {
      emptyFields.push(property)
    }
  })

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please fill in all the required fields",
      emptyFields,
    })
  }
  try {
    const user = await User.create({ first_name, last_name, age, city, email })
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
// post many
async function postMany(req, res) {
  const data = req.body
  try {
    const users = await User.insertMany([...data])
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
// delete one
async function deleteOne(req, res) {
  try {
    const id = getIdAndCheck(req)
    const user = await User.deleteOne({ _id: id })
    handleDataNotFound(res, user)
    res.status(200).json({ message: `User with id ${id} has been deleted.` })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete one
async function deleteAll(_, res) {
  try {
    const user = await User.deleteMany({})
    console.log(user)
    res.status(200).json({ message: `All documents have been deleted.` })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
// update one
async function updateOne(req, res) {
  const data = req.body
  try {
    const id = getIdAndCheck(req)
    const user = await User.findOneAndUpdate({ _id: id }, { ...data })
    const updated = await User.findById({ _id: id })
    handleDataNotFound(res, user)
    res
      .status(200)
      .json({ message: `User with id ${id} has been updated.`, user: updated })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getAll,
  getOne,
  postOne,
  postMany,
  deleteOne,
  deleteAll,
  updateOne,
}
