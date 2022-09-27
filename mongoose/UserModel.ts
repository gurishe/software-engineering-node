import mongoose from "mongoose";
import UserSchema from "./UserSchema";

/**
 * This is based on the Assignment 1 documentation:
 * https://docs.google.com/document/d/1zWYPxurQGwcLcNfDbIq4oBGM-VOSV13LlZgaAbq1Fek/edit
 */
const UserModel = mongoose.model('UserModel', UserSchema);
export default UserModel;