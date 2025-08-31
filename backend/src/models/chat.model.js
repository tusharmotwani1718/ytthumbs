import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const chatSchema = new Schema({
    chatName: {
        type: String,
        default: "Untitled",
        required: true
    },
    conversation: [
        {
            role: {
                type: String,
                required: true,
                default: "user"
            },
            message: {
                type: String,
                required: true
            },
            model: {
                type: String,
                default: null
            },
            imageUrl: {
                type: String,
                default: null,
            }
        }

    ]

}, { timestamps: true })


chatSchema.plugin(mongooseAggregatePaginate);

export const Chat = mongoose.model("Chat", chatSchema);