/**
 * @file A mongoose schema holding all the Tuit information for being added to the tuits table
 * in MongoDB.
 */

import mongoose from "mongoose";

const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    postedOn: Date,
}, {collection: 'tuits'});

export default TuitSchema;
