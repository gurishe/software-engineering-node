import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";

export default class TuitDao implements TuitDaoI {
    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }
    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return await TuitModel.find({postedBy: {_id: uid}});
    }
    async findTuitById(tid: string): Promise<Tuit> {
        const newTuit = await TuitModel.findById(tid);
        return new Tuit(
            newTuit?.tuit ?? '',
            newTuit?.user ?? null,
            newTuit?.date ?? null
        );
    }
    async createTuit(tuit: Tuit): Promise<Tuit> {
        const newTuit = await TuitModel.create(tuit);
        return new Tuit(
            newTuit?.tuit.toString() || '',
            newTuit?.postedBy ?? null,
            newTuit?.postedOn ?? null
        )
    }
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        const numUpdated = await TuitModel.updateOne(
            {_id: tid},
            {$set: tuit}
        )
        return numUpdated.upsertedCount;
    }
    async deleteTuit(tid: string): Promise<any>{
        return await TuitModel.deleteOne({_id: tid})
    }
}
