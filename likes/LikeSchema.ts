import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
    likedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    likedTuit: {type: mongoose.Schema.Types.ObjectId, ref: 'TuitModel'}
}, {collection: 'likes'});

export default LikeSchema;