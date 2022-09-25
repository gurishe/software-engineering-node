import mongoose from "mongoose";

const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedOn: {type: Date, default: Date.now},
    postedBy: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'UserModel'},
}, {collection: 'tuits'});

export default TuitSchema