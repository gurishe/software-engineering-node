/**
 * @file Implements a mongoose model for our MongoDB tuits table which can be interacted with
 * in data access objects (DAOs)
 */

import mongoose from "mongoose";
import tuitSchema from "./TuitSchema";

const TuitModel = mongoose.model("TuitModel", tuitSchema);

export default TuitModel;
