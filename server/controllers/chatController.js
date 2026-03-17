const Message = require("../models/message");
const Conversation = require("../models/conversation");
const { getReceiverSocketId, io } = require("../socket/socket");

// send message
exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.user.userId;

    // validation
    if (!receiverId || !message) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong during fetch data",
      });
    }

    if (receiverId === senderId) {
      return res.status(400).json({
        success: false,
        message: "Both id's cannot be same",
      });
    }

    // find conversation
    let conversation = await Conversation.findOne({
      members: { $all: [receiverId, senderId] },
    });

    // create conversation if not exist
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    // create message
    const newMessage = await Message.create({
      conversationId: conversation._id,
      senderId: senderId,
      message: message,
    });

    // update conversation preview
    await Conversation.findByIdAndUpdate(conversation._id, {
      lastMessage: message,
      lastMessageTime: new Date(),
    });

    // socket.io implement
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("new-message", newMessage);
    }

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      newMessage: newMessage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

// find conversation
exports.findConversation = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.user.userId;

    if (!receiverId || !senderId) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong during fetching ids",
      });
    }

    if (receiverId === senderId) {
      return res.status(400).json({
        success: false,
        message: "Both ids cannot be same",
      });
    }

    // find conversation
    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    }).populate("members", "-password");

    // if no conversation exists
    if (!conversation) {
      return res.status(200).json({
        success: true,
        message: "No conversation found",
        conversation: null,
        messages: [],
      });
    }

    // fetch messages
    const messages = await Message.find({
      conversationId: conversation._id,
    })
      .populate("senderId", "firstName profileImage")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      message: "Conversation fetched successfully",
      conversation,
      messages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

// find all chat users
exports.chatUsers = async (req, res) => {
  try {
    const userId = req.user.userId;

    const conversations = await Conversation.find({
      members: { $in: [userId] },
    })
      .populate("members", "-password")
      .sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Successfully fetched chat users",
      conversations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
