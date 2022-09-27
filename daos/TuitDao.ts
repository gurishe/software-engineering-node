import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";

export default class TuitDao implements TuitDaoI {
    async findAllTuits(): Promise<Tuit[]> {
        const allTuits = await TuitModel.find()
            .populate('postedBy')
            .exec();
        return allTuits.map(tuit =>
            new Tuit(
                tuit?.tuit || '',
                tuit?.postedBy ?? null,
                tuit?.date ?? null,
            )
        );
    }

    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        const userTuits = await TuitModel.find({postedBy: {_id: uid}})
            .populate('postedBy')
            .exec();
        return userTuits.map(tuit =>
            new Tuit(tuit?.tuit || '',
                tuit?.postedBy ?? null,
                tuit?.date ?? null,
            )
        );
    }

    async findTuitById(tid: string): Promise<Tuit> {
        const tuit = await TuitModel.findById(tid);
        return new Tuit(
            tuit?.tuit || '',
            tuit?.postedBy ?? null,
            tuit?.date ?? null
        );
    }

    async createTuit(tuit: Tuit): Promise<Tuit> {
        const newTuit = await TuitModel.create(tuit);
        return new Tuit(
            newTuit?.tuit || '',
            newTuit?.postedBy ?? null,
            newTuit?.postedOn ?? null
        );
    }

    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        const numUpdated = await TuitModel.updateOne(
            {_id: tid},
            {$set: tuit}
        );
        return numUpdated.upsertedCount;
    }

    async deleteTuit(tid: string): Promise<any> {
        const result = await TuitModel.deleteOne({_id: tid});
        return result.deletedCount;
    }
}
