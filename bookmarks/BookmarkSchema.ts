/**
 * @file A mongoose schema holding all the Bookmark information for being added to the bookmarks table
 * in MongoDB.
 */

import mongoose from "mongoose";

/**
 * The mongoose schema defining the requirements for inserting into the bookmarks table
 * @global
 */
const BookmarkSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true},
    tuit: {type: mongoose.Schema.Types.ObjectId, ref: 'TuitModel', required: true}
}, {collection: 'bookmarks'})

export default BookmarkSchema;