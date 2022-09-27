import mongoose from "mongoose";
import TuitSchema from "./TuitSchema";

/**
 * This is based on the Assignment 1 documentation:
 * https://docs.google.com/document/d/1zWYPxurQGwcLcNfDbIq4oBGM-VOSV13LlZgaAbq1Fek/edit
 */
const TuitModel = mongoose.model('TuitModel', TuitSchema);
export default TuitModel;