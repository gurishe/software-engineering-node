/**
 * @file A mongoose schema holding all the Like information for being added to the likes table
 * in MongoDB.
 */

import mongoose from "mongoose";

/**
 * The mongoose schema defining the requirements for inserting into the likes table
 * @global
 */
const LikeSchema = new mongoose.Schema({
    likedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    tuit: {type: mongoose.Schema.Types.ObjectId, ref: 'TuitModel'},
    isDislike: {type: Boolean, default: false}
}, {collection: 'likes'});

export default LikeSchema;
