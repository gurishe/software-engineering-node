/**
 * @file This contains an implementation of the Tuit DAO interface which handles the communication
 * with a MongoDB database to return Tuit data stored there. The DAO leverages the mongoose Tuit
 * model as well.
 */

import TuitDaoI from "./TuitDaoI";
import Tuit from "./Tuit";
import TuitModel from "./TuitModel";
import User from "../users/User";

/**
 * Our Tuit DAO implementation class for handling MongoDB database accesses.
 * @property {TuitDao} tuitDao The internal DAO instance
 * @class TuitDao
 * @implements {TuitDaoI}
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;

    /**
     * Creates a Tuit Dao instance if it has not already been initialized and returns the instance.
     * @return {TuitDao} The initialized Tuit DAO object
     */
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    /**
     * Private constructor to support the singleton pattern
     * @private
     */
    private constructor() {}

    /**
     * Finds and returns a Tuit by its primary ID
     * @param {string} id The primary ID of the Tuit
     * @return {Tuit} The Tuit object
     */
    async findTuitById(id: string): Promise<Tuit> {
        const tuitMongooseModel = await TuitModel
            .findById(id)
            .populate('postedBy')
            .exec();
        const author = new User(
            tuitMongooseModel.postedBy?._id.toString() ?? '',
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

    /**
     * Finds and returns all Tuits in the database
     * @return {Tuit[]} An array of all Tuits
     */
    async findAllTuits(): Promise<Tuit[]> {
        const tuitMongooseModels = await TuitModel
            .find()
            .populate('postedBy')
            .exec();
        return tuitMongooseModels
            .map(tuitMongooseModel => {
                const tuit = new Tuit(
                    tuitMongooseModel?._id.toString() ?? '',
                    tuitMongooseModel?.tuit ?? '',
                    new Date(tuitMongooseModel?.postedOn ?? (new Date()))
                );
                tuit.author = new User(
                    tuitMongooseModel?.postedBy?._id.toString() ?? '',
                    tuitMongooseModel?.postedBy?.username ?? '',
                    tuitMongooseModel?.postedBy?.password ?? '');
                return tuit;
        });
    }

    /**
     * Finds and returns all Tuits written by a given User
     * @param {string} authorId The primary ID of the User who wrote the Tuits
     * @return {Tuit[]} An array of Tuits
     */
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

    /**
     * Stores and returns a new Tuit
     * @param {Tuit} tuit The Tuit object to be stored
     * @return {Tuit} The Tuit object that was stored
     */
    async createTuit(tuit: Tuit): Promise<Tuit> {
        const tuitMongooseModel = await TuitModel.create(tuit);
        const newTuit = new Tuit(
            tuitMongooseModel?._id.toString() ?? '',
            tuitMongooseModel?.tuit ?? '',
            new Date(tuitMongooseModel?.postedOn ?? (new Date()))
        );
        newTuit.author = new User(
            tuitMongooseModel?.postedBy?.toString() ?? '',
            '',
            ''
        );
        return newTuit;
    }

    /**
     * Removes an existing Tuit record
     * @param {string} tuitId The primary ID of the Tuit to be removed
     * @return {number} The number of records removed
     */
    async deleteTuit(tuitId: string): Promise<any> {
        return TuitModel.deleteOne({_id: tuitId});
    }

    /**
     * Updates the text body of an existing Tuit record
     * @param {string} tuitId The primary ID of the Tuit to be updated
     * @param {Tuit} tuit The Tuit containing the new text
     * @return {number} The number of records updated
     */
    async updateTuit(tuitId: string, tuit: Tuit): Promise<any> {
        return TuitModel.updateOne(
            {_id: tuitId},
            {$set: {tuit: tuit.post}}
        );
    }

    /**
     * Updates the statistics object of an existing Tuit record
     * @param {string} tid The primary ID of the Tuit to be updated
     * @param {object} newStats The object containing the updated count of likes
     * @return {number} The number of records updated
     */
    async updateLikes(tid: string, newStats: object): Promise<any> {
        return TuitModel.updateOne(
            {_id: tid},
            {$set: {stats: newStats}}
        );
    }


}
