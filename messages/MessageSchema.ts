/**
 * @file A mongoose schema holding all the Message information for being added to the messages table
 * in MongoDB.
 */

import mongoose from "mongoose";

/**
 * The mongoose schema defining the requirements for inserting into the messages table
 * @global
 */
const MessageSchema = new mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    recipient: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    message: {type: String, required: true},
    sentOn: {type: Date, default: Date.now}
}, {collection: 'messages'});

export default MessageSchema;