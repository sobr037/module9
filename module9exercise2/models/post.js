const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
  author: { type: Schema.Types.ObjectId, ref: "User" }, // User who created the post
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }], // Users who liked the post
  comments: [
    {
      text: String,
      author: { type: Schema.Types.ObjectId, ref: "User" }, // User who commented
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
