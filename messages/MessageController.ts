/**
 * @file This contains an implementation of our Message Controller Interface which is used
 * with Express to establish our API URIs and parse incoming HTTP messages to be passed off
 * to a data access object (DAO).
 */

import MessageControllerI from "./MessageControllerI";
import MessageDaoI from "./MessageDaoI";
import {Express, Request, Response} from "express";
import User from "../users/User";

/**
 * Our Message controller implementation class for parsing HTTP requests and return JSON responses.
 * @property {MessageController} messageController The internal controller instance
 * @property {MessageDao} messageDao The internal DAO instance
 */
export default class MessageController implements MessageControllerI {
    private static messageController: MessageControllerI | null = null;
    private static messageDao: MessageDaoI;

    /**
     * Creates or returns an instance of the Message Controller so that it can be used by the
     * Express app and return JSON objects.
     * @param {Express} app The Express object that handles the HTTP parsing and responding
     * @param {MessageDao} messageDao The DAO that handles communications with the remote database
     * @return {MessageController} The initialized MessageController object
     */
    public static getInstance = (app: Express, messageDao: MessageDaoI): MessageControllerI => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
        }
        MessageController.messageDao = messageDao;
        app.post(
            '/api/users/:uidSender/messages/:uidRecipient',
            MessageController.messageController.createMessage
        );
        app.get(
            '/api/users/:uid/messages/sent',
            MessageController.messageController.findSentMessages
        );
        app.get(
            '/api/users/:uid/messages/received',
            MessageController.messageController.findReceivedMessages
        );
        app.delete(
            '/api/messages/:mid',
            MessageController.messageController.deleteMessage
        );

        return MessageController.messageController;
    }

    /**
     * @private
     */
    private constructor() {}

    /**
     * Parses an HTTP request and adds a JSON version of the newly created Message to the HTTP
     * response. Expects two Users and a string message in the HTTP request body.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    createMessage = (req: Request, res: Response) =>
        MessageController.messageDao
            .createMessage(
                new User(
                    req.params.uidSender,
                    req.body.sender.username,
                    req.body.sender.password
                ),
                new User(
                    req.params.uidRecipient,
                    req.body.recipient.username,
                    req.body.recipient.password
                ),
                req.body.message
            )
            .then(message => res.json(message));

    /**
     * Parses an HTTP request and adds a JSON version of the result of deleting a Message in the
     * HTTP response.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao
            .deleteMessage(req.params.mid)
            .then(result => res.json(result));

    /**
     * Parses an HTTP request and adds a JSON formatted array of Messages to the HTTP response.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    findSentMessages = (req: Request, res: Response) =>
        MessageController.messageDao
            .findSentMessages(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Parses an HTTP request and adds a JSON formatted array of Messages to the HTTP response.
     * @param {Request} req The Express HTTP request object
     * @param {Response} res The Express HTTP Response object
     * @return void
     */
    findReceivedMessages = (req: Request, res: Response) =>
        MessageController.messageDao
            .findReceivedMessages(req.params.uid)
            .then(messages => res.json(messages));
}