import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";
import UserModel from "../mongoose/UserModel";

export default class TuitDao implements TuitDaoI {
    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }
    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return await TuitModel.find({postedBy: {_id: uid}});
    }
    async findTuitById(tid: string): Promise<Tuit> {
        const newTuit: Tuit | null = await TuitModel.findById(tid);
        return new Tuit(
            newTuit?.tuitBody ?? '',
            newTuit?.user ?? null,
            newTuit?.date ?? null
        );
    }
    async createTuit(tuit: Tuit): Promise<Tuit> {
        const newTuit: Tuit = await TuitModel.create(tuit);
        return new Tuit(
            newTuit?.tuitBody ?? '',
            newTuit?.user ?? null,
            newTuit?.date ?? null
        )
    }
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id: tid}, {$set: tuit})
    }
    async deleteTuit(tid: string): Promise<any>{
        return await TuitModel.deleteOne({_id: tid})
    }
}
