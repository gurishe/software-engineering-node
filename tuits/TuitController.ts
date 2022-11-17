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
 * @property {TuitController} tuitController The internal controller instance
 * @property {TuitDao} tuitDao The internal DAO instance
 * @class TuitController
 * @implements {TuitControllerI}
 */
export default class TuitController implements TuitControllerI {
    private static tuitController: TuitController | null = null;
    private static tuitDao: TuitDaoI;

    /**
     * Creates or returns an instance of the Tuit Controller so that it can be used by the
     * Express app and return JSON objects.
     * @param {Express} app The Express object that handles the HTTP parsing and responding
     * @param {TuitDao} tuitDao The DAO that handles communications with the remote database
     * @return {TuitController} The initialized Tuit Controller object
     */
    public static getInstance = (app: Express, tuitDao: TuitDaoI): TuitController => {
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
     * Private constructor to support the singleton pattern
     * @private
     */
    private constructor() {}

    /**
     * Parses an HTTP request and adds a JSON formatted array of all Tuits in the HTTP response.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao
            .findAllTuits()
            .then(tuits => res.json(tuits));

    /**
     * Parses an HTTP request and adds a JSON formatted Tuit object in the HTTP response.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao
            .findTuitById(req.params.tid)
            .then(tuit => res.json(tuit));

    /**
     * Parses an HTTP request and adds a JSON formatted array of all Tuits written by a specified
     * User in the HTTP response.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    findTuitsByAuthor = (req: Request, res: Response) => {
        let userId = req.params.uid === 'me' && req.session['profile']
            ? req.session['profile'].id
            : req.params.uid;

        TuitController.tuitDao
            .findTuitsByAuthor(userId)
            .then(tuits => res.json(tuits));
    }
    /**
     * Parses an HTTP request and adds a new JSON formatted Tuit object in the HTTP response.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    createTuit = (req: Request, res: Response) => {
        let userId = req.params.uid === 'me' && req.session['profile']
            ? req.session['profile'].id
            : req.params.uid;

        TuitController.tuitDao
            .createTuit({...req.body, postedBy: userId})
            .then(actualTuit => res.json(actualTuit));
    }

    /**
     * Parses an HTTP request and adds a JSON formatted status of the delete request in the HTTP
     * response.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao
            .deleteTuit(req.params.tid)
            .then(status => res.json(status));

    /**
     * Parses an HTTP request and adds a JSON formatted status of the update request in the HTTP
     * response.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao
            .updateTuit(req.params.tid, req.body)
            .then(status => res.json(status));
}
