const mongoose = require("mongoose")

const { Schema, model } = mongoose

const dataSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: ""
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const UserModel = model("User", dataSchema)
module.exports = UserModel

// Example
// {
//     "_id": "64bfa89ec0db04857a48fc87",
//     "age": 69,
//     "avatar": "https://i.pravatar.cc/80?u=undefined",
//     "city": "Random City",
//     "description": "",
//     "email": "random951@example.com",
//     "first_name": "first951",
//     "last_name": "last951"
// }
