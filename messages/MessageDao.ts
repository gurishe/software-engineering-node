/**
 * @file This contains an implementation of the Message DAO interface which handles the communication
 * with a MongoDB database to return Message data stored there. The DAO leverages the mongoose Message
 * model as well.
 */

import MessageDaoI from "./MessageDaoI";
import User from "../users/User";
import Message from "./Message";
import MessageModel from "./MessageModel";

/**
 * Our Message DAO implementation class for handling MongoDB database accesses.
 * @property {MessageDao} messageDao The internal DAO instance
 * @class MessageDao
 * @implements {MessageDaoI}
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    /**
     * Creates a Message Dao instance if it has not already been initialized and returns the instance.
     * @return {MessageDao} The initialized Message DAO object
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    /**
     * Private constructor to support the singleton pattern
     * @private
     */
    private constructor() {}

    /**
     * Creates and returns a new Message between two Users
     * @param {User} sender The User sending the message
     * @param {User} recipient The User receiving the message
     * @param {string} message The text-based message sent by the sender
     * @return {Message} The newly created Message object
     */
    async createMessage(sender: User, recipient: User, message: string): Promise<Message> {
        const now = new Date();
        const model = await MessageModel
            .create({
                sender: sender.idUser,
                recipient: recipient.idUser,
                message: message,
                sentOn: now
            });
        return new Message(model?._id.toString(), message, now, sender, recipient);
    }

    /**
     * Finds and returns all Messages sent by a given User
     * @param {string} senderId The primary ID of the User
     * @return An array of Messages sent by the User
     */
    async findSentMessages(senderId: string): Promise<Message[]> {
        const model = await MessageModel
            .find({sender: senderId})
            .populate('recipient')
            .exec();
        return model.map(message =>
            new Message(
                message?._id.toString() ?? '',
                message?.message ?? '',
                message?.sentOn ?? new Date(),
                null,
                new User(
                    message?.recipient?._id.toString() ?? '',
                    message?.recipient?.username ?? '',
                    message?.recipient?.password ?? ''
                    )
            )
        );
    }

    /**
     * Finds and returns all Messages received by a given User
     * @param {string} receivedId The primary ID of the User
     * @return An array of Messages received by the User
     */
    async findReceivedMessages(receivedId: string): Promise<Message[]> {
        const model = await MessageModel
            .find({recipient: receivedId})
            .populate('sender')
            .exec();
        return model.map(message =>
            new Message(
                message?._id.toString() ?? '',
                message?.message ?? '',
                message?.sentOn ?? new Date(),
                new User(
                    message?.sender?._id.toString() ?? '',
                    message?.sender?.username ?? '',
                    message?.sender?.password ?? ''
                ),
                null
            )
        );
    }

    /**
     * Removes an existing Message
     * @param {string} messageId The primary ID of the message to remove
     * @return {number} The number of records deleted
     */
    async deleteMessage(messageId: string): Promise<any> {
        return MessageModel.deleteOne({_id: messageId});
    }
}