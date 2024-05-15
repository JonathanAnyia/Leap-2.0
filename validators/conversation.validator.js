import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
    lastMessage: {
      text: { type: String, required: true },
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      seen: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

// Custom validator for lastMessage.sender to ensure it references an existing User
conversationSchema.path("lastMessage.sender").validate(async function(value) {
  const User = mongoose.model("User"); // Assuming you have a User model
  const user = await User.findById(value);
  return !!user; // Return true if user exists, false otherwise
}, "Invalid sender ID. User not found.");

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;