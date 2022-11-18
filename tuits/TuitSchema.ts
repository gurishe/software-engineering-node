/**
 * @file A mongoose schema holding all the Tuit information for being added to the tuits table
 * in MongoDB.
 */

import mongoose from "mongoose";

/**
 * The mongoose schema defining the requirements for inserting into the tuits table
 * @global
 */
const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    postedOn: Date,
    stats: {
        replies: {type: Number, default: 0},
        retuits: {type: Number, default: 0},
        likes: {type: Number, default: 0}
    }
}, {collection: 'tuits'});

export default TuitSchema;
