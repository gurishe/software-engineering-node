/**
 * @file Implements a mongoose model for our MongoDB follows table which can be interacted with
 * in data access objects (DAOs)
 */

import mongoose from "mongoose";
import FollowSchema from "./FollowSchema";

/**
 * The mongoose model wrapper around our FollowSchema
 * @global
 */
const FollowModel = mongoose.model("FollowModel", FollowSchema);

export default FollowModel;