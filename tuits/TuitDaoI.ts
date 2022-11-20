/**
 * @file The interface that all of our data access objects (DAOs) dealing with
 * Tuits must implement
 */

import Tuit from "./Tuit";

/**
 * The interface for any Tuit DAOs
 * @interface TuitDaoI
 */
export default interface TuitDaoI {
    findAllTuits(): Promise<Tuit[]>;
    findTuitById(id: string): Promise<Tuit>;
    findTuitsByAuthor(authorId: string): Promise<Tuit[]>;
    createTuit(tuit: Tuit): Promise<Tuit>;
    updateTuit(tuitId: string, tuit: Tuit): Promise<any>;
    deleteTuit(tuitId: string): Promise<any>;
    updateStats(tid: string, newStats: object): Promise<any>;
}
