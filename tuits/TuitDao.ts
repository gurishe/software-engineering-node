import TuitDaoI from "./TuitDaoI";
import Tuit from "./Tuit";
import TuitModel from "./TuitModel";
import User from "../users/User";

export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDaoI | null = null;

    public static getInstance = (): TuitDaoI => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    private constructor() {}

    async findTuitById(id: string): Promise<Tuit> {
        const tuitMongooseModel = await TuitModel
            .findById(id)
            .populate('postedBy')
            .exec();
        const author = new User(
            tuitMongooseModel.postedBy?._id ?? '',
            tuitMongooseModel.postedBy?.username ?? '',
            tuitMongooseModel.postedBy?.password ?? ''
        );
        const tuit = new Tuit(
            tuitMongooseModel?._id.toString() ?? '',
            tuitMongooseModel?.tuit ?? '',
            new Date(tuitMongooseModel?.postedOn ?? (new Date())))
        tuit.author = author;
        return tuit;
    }

    async findAllTuits(): Promise<Tuit[]> {
        const tuitMongooseModels = await TuitModel.find();
        return tuitMongooseModels
            .map((tuitMongooseModel) => {
                return new Tuit(
                    tuitMongooseModel?._id.toString() ?? '',
                    tuitMongooseModel?.tuit ?? '',
                    new Date(tuitMongooseModel?.postedOn ?? (new Date())))
            });
    }

    async findTuitsByAuthor(authorId: string): Promise<Tuit[]> {
        const tuitMongooseModels = await TuitModel
            .find({postedBy: authorId});
        return tuitMongooseModels
            .map((tuitMongooseModel) => {
                return new Tuit(
                    tuitMongooseModel?._id.toString() ?? '',
                    tuitMongooseModel?.tuit ?? '',
                    new Date(tuitMongooseModel?.postedOn ?? (new Date())))
            });
    }

    async createTuit(tuit: Tuit): Promise<Tuit> {
        const tuitMongooseModel = await TuitModel.create(tuit);
        return new Tuit(
            tuitMongooseModel?._id.toString() ?? '',
            tuitMongooseModel.tuit,
            new Date(tuitMongooseModel?.postedOn ?? (new Date()))
        )
    }

    async deleteTuit(tuitId: string): Promise<any> {
        return TuitModel.deleteOne({_id: tuitId});
    }

    async updateTuit(tuitId: string, tuit: Tuit): Promise<any> {
        return TuitModel.updateOne(
            {_id: tuitId},
            {$set: {tuit: tuit.post}}
        );
    }
}
