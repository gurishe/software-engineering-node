import User from "../users/User";
import Message from "./Message";

export default interface MessageDaoI {
    createMessage(sender: User, recipient: User, message: String): Promise<Message>;
    findSentMessages(senderId: string): Promise<Message[]>;
    findReceivedMessages(receivedId: string): Promise<Message[]>;
    deleteMessage(messageId: string): Promise<any>;
}
