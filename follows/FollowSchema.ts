import mongoose from "mongoose";

const FollowSchema = new mongoose.Schema({
    followed: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    follower: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}
}, {collection: 'follows'});

export default FollowSchema;