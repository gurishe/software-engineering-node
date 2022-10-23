/**
 * @file A mongoose schema holding all the Follow information for being added to the follows table
 * in MongoDB.
 */

import mongoose from "mongoose";

/**
 * The mongoose schema defining the requirements for inserting into the follows table
 * @global
 */
const FollowSchema = new mongoose.Schema({
    followed: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true},
    follower: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true}
}, {collection: 'follows'});

export default FollowSchema;