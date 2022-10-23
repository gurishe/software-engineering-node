/**
 * @file This contains an implementation of the Like DAO interface which handles the communication
 * with a MongoDB database to return Like data stored there. The DAO leverages the mongoose Like
 * model as well.
 */

import likeModel from "./LikeModel";
import LikeDaoI from "./LikeDaoI";
import Tuit from "../tuits/Tuit";
import User from "../users/User";
import Like from "./Like";

/**
 * Our Like DAO implementation class for handling MongoDB database accesses.
 * @property {LikeDao} likeDao The internal DAO instance
 * @class LikeDao
 * @implements {LikeDaoI}
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
     * Creates a Like Dao instance if it has not already been initialized and returns the instance.
     * @return {LikeDao} The initialized Like DAO object
     */
    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    /**
     * Private constructor to support the singleton pattern
     * @private
     */
    private constructor() {}

    /**
     * Find all Tuits liked by a specific User
     * @param {string} uid The primary ID of the User
     * @return {Tuit[]} An array of Tuits liked by the User
     */
    async findTuitsUserLiked(uid: string): Promise<Tuit[]> {
        const model = await likeModel
            .find({likedBy: uid})
            .populate('tuit')
            .populate('likedBy')
            .exec();
        return model.map(tuitModel =>
            new Tuit(
                tuitModel?.tuit?._id.toString() ?? '',
                tuitModel?.tuit?.tuit ?? '',
                new Date(tuitModel?.likedTuit?.postedOn ?? (new Date()))
            )
        );
    }

    /**
     * Find all Users that liked a specific Tuit
     * @param {string} tid The unique ID of the Tuit
     * @return {User[]} An array of Users who have liked the Tuit
     */
    async findUsersThatLikedTuit(tid: string): Promise<User[]> {
        const model = await likeModel
            .find({tuit: tid})
            .populate('tuit')
            .populate('likedBy')
            .exec();
        return model.map(user =>
            new User(
                user?.likedBy?._id.toString() ?? '',
                user?.likedBy?.username ?? '',
                user?.likedBy?.password ?? ''
            )
        );
    }

    /**
     * Find the number of Likes on a given Tuit
     * @param tid The primary ID of the Tuit
     * @return {number} The number of Likes on the Tuit
     */
    async findTuitLikesCount(tid: string): Promise<any> {
        return likeModel
            .find({tuit: tid})
            .count();
    }

    /**
     * Creates and returns a new Like
     * @param {string} uid The primary ID of the User liking the Tuit
     * @param {string} tid The primary ID of the Tuit being liked by the User
     * @return {Like} The newly created Like object
     */
    async userLikesTuit(uid: string, tid: string): Promise<Like> {
        const model = await likeModel
            .create({tuit: tid, likedBy: uid});
        return new Like(
            model?._id.toString() ?? '',
            model?.tuit?.toString() ?? '',
            model?.likedBy?.toString() ?? ''
        );
    }

    /**
     * Removes an existing Like record
     * @param {string} uid The primary ID of the User who liked the Tuit
     * @param {string} tid The primary ID of the Tuit liked by the User
     */
    async userUnlikesTuit(uid: string, tid: string): Promise<any> {
        return likeModel.deleteOne({tuit: tid, likedBy: uid});
    }
}
