const mongoose = require("mongoose")

const { Schema, model } = mongoose

const dataSchema = new Schema(
  {
    data: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const DataModel = model("User", dataSchema)
module.exports = DataModel
