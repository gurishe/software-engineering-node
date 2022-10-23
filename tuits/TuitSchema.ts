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
}, {collection: 'tuits'});

export default TuitSchema;
