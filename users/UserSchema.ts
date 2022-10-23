/**
 * @file A mongoose schema holding all the User information for being added to the users table
 * in MongoDB.
 */

import mongoose from "mongoose";

/**
 * The mongoose schema defining the requirements for inserting into the users table
 * @global
 */
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: String,
    profilePhoto: String,
    headerImage: String,
    accountType: {type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']},
    maritalStatus: {type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED']},
    biography: String,
    dateOfBirth: Date,
    joined: {type: Date, default: Date.now},
    location: {
        latitude: {type: Number, default: 0.0},
        longitude: {type: Number, default: 0.0},
    }
}, {collection: 'users'});

export default UserSchema;
