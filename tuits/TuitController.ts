import {Express, Request, Response} from "express";
import TuitDaoI from "./TuitDaoI";
import TuitControllerI from "./TuitControllerI";

export default class TuitController {
    private static tuitController: TuitController | null = null;
    private static tuitDao: TuitDaoI;
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
    private constructor() {}

    private findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao
            .findAllTuits()
            .then(tuits => res.json(tuits));

    private findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao
            .findTuitById(req.params.tid)
            .then(tuit => res.json(tuit));

    private findTuitsByAuthor = (req: Request, res: Response) =>
        TuitController.tuitDao
            .findTuitsByAuthor(req.params.uid)
            .then(tuits => res.json(tuits));
    private createTuit = (req: Request, res: Response) =>
        TuitController.tuitDao
            .createTuit({...req.body, postedBy: req.params.uid})
            .then(actualTuit => res.json(actualTuit));

    private deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao
            .deleteTuit(req.params.tid)
            .then(status => res.json(status));

    private updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao
            .updateTuit(req.params.tid, req.body)
            .then(status => res.json(status));
}
