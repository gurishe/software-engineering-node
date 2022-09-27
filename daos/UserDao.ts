import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";

/**
 * This is based on the Assignment 1 documentation:
 * https://docs.google.com/document/d/1zWYPxurQGwcLcNfDbIq4oBGM-VOSV13LlZgaAbq1Fek/edit
 */
export default class UserDao implements UserDaoI {
    async findAllUsers(): Promise<User[]> {
        const allUsers = await UserModel.find();
        return allUsers.map(userModel =>
            new User(userModel?.username ?? '',
                userModel?.password ?? '',
                userModel?.firstName ?? null,
                userModel?.lastName ?? null,
                userModel?.email ?? '',
            )
        );
    }
    async findUserById(uid: string): Promise<any> {
        const user = await UserModel.findById(uid);
        return new User(user?.username ?? '',
            user?.password ?? '',
            user?.firstName ?? null,
            user?.lastName ?? null,
            user?.email ?? '',
        );
    }
    async createUser(user: User): Promise<User> {
        const newUser = await UserModel.create(user);
        return new User(
            newUser?.username ?? '',
            newUser?.password ?? '',
            newUser?.firstName ?? null,
            newUser?.lastName ?? null,
            newUser?.email ?? '',
        );
    }
    async deleteUser(uid: string):  Promise<any> {
        const result = await UserModel.deleteOne({_id: uid});
        return result.deletedCount;
    }
    async updateUser(uid: string, user: User): Promise<any> {
        const result = await UserModel.updateOne(
            {_id: uid},
            {$set: user}
        );
        return result.upsertedCount;
    }
}
