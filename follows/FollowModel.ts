import mongoose from "mongoose";
import FollowSchema from "./FollowSchema";

const FollowModel = mongoose.model("FollowsModel", FollowSchema);

export default FollowModel;