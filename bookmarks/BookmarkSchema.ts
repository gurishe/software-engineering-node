import mongoose from "mongoose";

const BookmarkSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true},
    tuit: {type: mongoose.Schema.Types.ObjectId, ref: 'TuitModel', required: true}
}, {collection: 'bookmarks'})

export default BookmarkSchema;