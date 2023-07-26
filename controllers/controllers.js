const User = require("../models/model")
const getIdAndCheck = require("../functions/getIdAndCheck")
const handleDataNotFound = require("../functions/handleDataNotFound")

// get all
async function getAll(_, res) {
  try {
    const users = await User.find({}).sort({ createdAt: -1 })
    const count = await User.countDocuments()
    res.status(200).json({ count: count, users: users })
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
  const data = req.body
  try {
    const user = await User.create({ ...data })
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
  updateOne,
}
