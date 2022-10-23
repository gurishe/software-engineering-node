/**
 * @file This contains an implementation of the Follow DAO interface which handles the communication
 * with a MongoDB database to return Follow data stored there. The DAO leverages the mongoose Follow
 * model as well.
 */

import FollowDaoI from "./FollowDaoI";
import User from "../users/User";
import Follow from "./Follow";
import FollowModel from "./FollowModel";

/**
 * Our Follow DAO implementation class for handling MongoDB database accesses.
 * @property {FollowDao} followDao The internal DAO instance
 * @class FollowDao
 * @implements {FollowDaoI}
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Creates a Follow Dao instance if it has not already been initialized and returns the instance.
     * @return {FollowDao} The initialized Follow DAO object
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    /**
     * Private constructor to support the singleton pattern
     * @private
     */
    private constructor() {}

    /**
     * Finds and returns all the Users a given User is following
     * @param followerId The unique ID for the following User
     * @return {User[]} An array of Users
     */
    async findFollowed(followerId: string): Promise<User[]> {
        const model = await FollowModel
            .find({follower: followerId})
            .populate('followed')
            .exec();
        return model.map(follow =>
            new User(
                follow?.followed?._id.toString() ?? '',
                follow?.followed?.username ?? '',
                follow?.followed?.password ?? ''
            )
        );
    }

    /**
     * Finds and returns all the Users following a given User
     * @param followingId The unique ID for the following User
     * @return {User[]} An array of Users
     */
    async findFollowers(followingId: string): Promise<User[]> {
        const model = await FollowModel
            .find({followed: followingId})
            .populate('follower')
            .exec();
        return model.map(follow =>
            new User(
                follow?.follower?._id.toString() ?? '',
                follow?.follower?.username ?? '',
                follow?.follower?.password ?? ''
            )
        );
    }

    /**
     * Creates and returns a new Follow linking two Users
     * @param {User} follower The User initiating the follow request (doing the following)
     * @param {User} followed The User being followed
     * @return {Follow} The newly created Follow object
     */
    async followUser(follower: User, followed: User): Promise<Follow> {
        const model = await FollowModel
            .create({
                follower: follower.idUser,
                followed: followed.idUser
            });
        return new Follow(model?._id.toString(), follower, followed);
    }

    /**
     * Finds and deletes a Follow record by its unique ID
     * @param {string} followId The unique ID of the Follow record
     * @return {number} The number of records deleted
     */
    async unfollowUser(followId: string): Promise<any> {
        return FollowModel.deleteOne({_id: followId});
    }
}