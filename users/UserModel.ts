/**
 * @file Implements a mongoose model for our MongoDB users table which can be interacted with
 * in data access objects (DAOs)
 */

import mongoose from "mongoose";
import UserSchema from "./UserSchema";

/**
 * The mongoose model wrapper around our UserSchema
 * @global
 */
const UserModel = mongoose.model('UserModel', UserSchema);

export default UserModel;
