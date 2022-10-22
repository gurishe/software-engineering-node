/**
 * @file This contains an implementation of our Tuit Controller Interface which is used
 * with Express to establish our API URIs and parse incoming HTTP messages to be passed off
 * to a data access object (DAO).
 */

import {Express, Request, Response} from "express";
import TuitDaoI from "./TuitDaoI";
import TuitControllerI from "./TuitControllerI";

/**
 * Our Tuit controller implementation class for parsing HTTP requests and return JSON responses.
 */
export default class TuitController implements TuitControllerI {
    private static tuitController: TuitControllerI | null = null;
    private static tuitDao: TuitDaoI;

    /**
     * Creates or returns an instance of the Tuit Controller so that it can be used by the
     * Express app and return JSON objects.
     * @param {Object} app The Express object that handles the HTTP parsing and responding
     * @param {Object} tuitDao The DAO that handles communications with the remote database
     * @return {Object} The initialized Tuit Controller object
     */
    public static getInstance = (app: Express, tuitDao: TuitDaoI): TuitControllerI => {
        if (TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
        }
        TuitController.tuitDao = tuitDao;
        app.get('/api/tuits', TuitController.tuitController.findAllTuits);
        app.get('/api/tuits/:tid', TuitController.tuitController.findTuitById);
        app.get('/api/users/:uid/tuits', TuitController.tuitController.findTuitsByAuthor);
        app.post('/api/users/:uid/tuits', TuitController.tuitController.createTuit);
        app.delete('/api/tuits/:tid', TuitController.tuitController.deleteTuit);

        return TuitController.tuitController;
    }

    /**
     * Constructor to create our controller
     * @private private constructor to support the singleton pattern
     */
    private constructor() {}

    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao
            .findAllTuits()
            .then(tuits => res.json(tuits));

    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao
            .findTuitById(req.params.tid)
            .then(tuit => res.json(tuit));

    findTuitsByAuthor = (req: Request, res: Response) =>
        TuitController.tuitDao
            .findTuitsByAuthor(req.params.uid)
            .then(tuits => res.json(tuits));

    createTuit = (req: Request, res: Response) =>
        TuitController.tuitDao
            .createTuit({...req.body, postedBy: req.params.uid})
            .then(actualTuit => res.json(actualTuit));

    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao
            .deleteTuit(req.params.tid)
            .then(status => res.json(status));

    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao
            .updateTuit(req.params.tid, req.body)
            .then(status => res.json(status));
}
