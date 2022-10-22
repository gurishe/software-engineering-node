import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    recipient: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    message: {type: String, required: true},
    sentOn: Date
}, {collection: 'messages'});

export default MessageSchema;