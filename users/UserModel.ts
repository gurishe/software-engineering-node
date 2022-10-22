/**
 * @file Implements a mongoose model for our MongoDB users table which can be interacted with
 * in data access objects (DAOs)
 */

import mongoose from "mongoose";
import UserSchema from "./UserSchema";

const UserModel = mongoose.model('UserModel', UserSchema);

export default UserModel;
