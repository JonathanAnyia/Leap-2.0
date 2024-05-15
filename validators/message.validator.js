import mongoose from "mongoose";
import Conversation from "./conversation";

const messageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        text: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return v.length > 0; // Text should not be empty
                },
                message: props => `Text cannot be empty!`
            }
        },
        seen: {
            type: Boolean,
            default: false,
        },
        img: {
            type: String,
            default: "",
        },
    },
    { timestamps: true } // Corrected to 'timestamps' with an 's'
);

const Message = mongoose.model("Message", messageSchema);

export default Message;