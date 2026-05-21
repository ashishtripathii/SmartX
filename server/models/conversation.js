const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lastMessage: {
      type: String,
    },
    lastMessageTime: {
      type: Date,
    },
    unreadCounts: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  { timestamps: true },
);

conversationSchema.index({ members: 1 });

module.exports = mongoose.model("Conversation", conversationSchema);
