import mongoose from "mongoose";
import LikeSchema from "./LikeSchema";

const LikeModel = mongoose.model("LikesModel", LikeSchema);

export default LikeModel;
