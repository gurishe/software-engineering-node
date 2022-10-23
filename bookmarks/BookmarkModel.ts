/**
 * @file Implements a mongoose model for our MongoDB bookmarks table which can be interacted with
 * in data access objects (DAOs)
 */

import mongoose from "mongoose";
import BookmarkSchema from "./BookmarkSchema";

/**
 * The mongoose model wrapper around our BookmarkSchema
 * @global
 */
const BookmarkModel = mongoose.model("BookmarkModel", BookmarkSchema);

export default BookmarkModel;