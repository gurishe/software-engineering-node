import likeModel from "./LikeModel";
import LikeDaoI from "./LikeDaoI";
import Tuit from "../tuits/Tuit";
import User from "../users/User";
import Like from "./Like";

export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDaoI | null = null;

    public static getInstance = (): LikeDaoI => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    private constructor() {}

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

    async findTuitLikesCount(tid: string): Promise<any> {
        return likeModel
            .find({tuit: tid})
            .count();
    }

    async userLikesTuit(uid: string, tid: string): Promise<Like> {
        const model = await likeModel
            .create({tuit: tid, likedBy: uid});
        return new Like(
            model?._id.toString() ?? '',
            model?.tuit?.toString() ?? '',
            model?.likedBy?.toString() ?? ''
        );
    }

    async userUnlikesTuit(uid: string, tid: string): Promise<any> {
        return likeModel
            .deleteOne({tuit: tid, likedBy: uid});
    }
}
