import MessageDaoI from "./MessageDaoI";
import User from "../users/User";
import Message from "./Message";
import MessageModel from "./MessageModel";

export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDaoI | null = null;

    public static getInstance = (): MessageDaoI => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

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
    async deleteMessage(messageId: string): Promise<any> {
        return MessageModel.deleteOne({_id: messageId});
    }
}