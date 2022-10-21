import FollowDaoI from "./FollowDaoI";
import User from "../users/User";
import Follow from "./Follow";
import FollowModel from "./FollowModel";
import mongoose, {ObjectId} from "mongoose";

export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDaoI | null = null;

    public static getInstance = (): FollowDaoI => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

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

    async followUser(follower: User, followed: User): Promise<Follow> {
        const model = await FollowModel
            .create({
                follower: follower.idUser,
                followed: followed.idUser
            });
        return new Follow(
            model?._id.toString(),
            follower,
            followed
        )
    }

    async unfollowUser(followId: string): Promise<any> {
        return FollowModel.deleteOne({_id: followId})
    }
}