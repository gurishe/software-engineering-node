/**
 * @file Implements a mongoose model for our MongoDB likes table which can be interacted with
 * in data access objects (DAOs)
 */

import mongoose from "mongoose";
import LikeSchema from "./LikeSchema";

const LikeModel = mongoose.model("LikesModel", LikeSchema);

export default LikeModel;
