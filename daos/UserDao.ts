import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";

/**
 * This is based on the Assignment 1 documentation:
 * // https://docs.google.com/document/d/1zWYPxurQGwcLcNfDbIq4oBGM-VOSV13LlZgaAbq1Fek/edit
 */
export default class UserDao implements UserDaoI {
    async findAllUsers(): Promise<User[]> {
        return await UserModel.find();
    }
    async findUserById(uid: string): Promise<any> {
        return await UserModel.findById(uid);
    }
    async createUser(user: User): Promise<User> {
        const newUser = await UserModel.create(user);
        return new User(
            newUser?.username ?? '',
            newUser?.password ?? '',
            newUser?.firstName ?? null,
            newUser?.lastName ?? null,
            newUser?.email ?? '',
        )
    }
    async deleteUser(uid: string):  Promise<any> {
        return await UserModel.deleteOne({_id: uid});
    }
    async updateUser(uid: string, user: User): Promise<any> {
        return await UserModel.updateOne({_id: uid}, {$set: user});
    }
}
