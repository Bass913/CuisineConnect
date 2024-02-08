import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    text: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: false,
    },
    files: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
