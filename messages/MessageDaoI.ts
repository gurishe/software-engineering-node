/**
 * @file The interface that all of our data access objects (DAOs) dealing with
 * Messages must implement
 */

import User from "../users/User";
import Message from "./Message";

/**
 * The interface for any Message DAOs
 * @interface MessageDaoI
 */
export default interface MessageDaoI {
    createMessage(sender: User, recipient: User, message: String): Promise<Message>;
    findSentMessages(senderId: string): Promise<Message[]>;
    findReceivedMessages(receivedId: string): Promise<Message[]>;
    deleteMessage(messageId: string): Promise<any>;
}
