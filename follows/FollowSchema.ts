import mongoose from "mongoose";

const FollowSchema = new mongoose.Schema({
    followed: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true},
    follower: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true}
}, {collection: 'follows'});

export default FollowSchema;