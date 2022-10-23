/**
 * @file Implements a mongoose model for our MongoDB messages table which can be interacted with
 * in data access objects (DAOs)
 */

import mongoose from "mongoose";
import MessageSchema from "./MessageSchema";

/**
 * The mongoose model wrapper around our MessageSchema
 * @global
 */
const MessageModel = mongoose.model("MessageModel", MessageSchema);

export default MessageModel;