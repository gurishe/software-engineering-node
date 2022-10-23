/**
 * @file Implements a mongoose model for our MongoDB likes table which can be interacted with
 * in data access objects (DAOs)
 */

import mongoose from "mongoose";
import LikeSchema from "./LikeSchema";

/**
 * The mongoose model wrapper around our LikeSchema
 * @global
 */
const LikeModel = mongoose.model("LikeModel", LikeSchema);

export default LikeModel;
