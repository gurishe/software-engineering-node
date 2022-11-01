/**
 * @file This contains an implementation of the User DAO interface which handles the communication
 * with a MongoDB database to return User data stored there. The DAO leverages the mongoose User
 * model as well.
 */

import User from "./User";
import UserModel from "./UserModel";
import UserDaoI from "./UserDaoI";

/**
 * Our User DAO implementation class for handling MongoDB database accesses.
 * @property {UserDao} userDao The internal DAO instance
 * @class UserDao
 * @implements {UserDaoI}
 */
export default class UserDao implements UserDaoI {
    private static userDao: UserDao | null = null;

    /**
     * Creates a User Dao instance if it has not already been initialized and returns the instance.
     * @return {UserDao} The initialized User DAO object
     */
    public static getInstance = (): UserDao => {
        if (UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }

    /**
     * Private constructor to support the singleton pattern
     * @private
     */
    private constructor() {}

    /**
     * Finds and returns all Users
     * @return {User[]} An array of all Users
     */
    async findAllUsers(): Promise<User[]> {
        const userMongooseModels = await UserModel.find();
        return userMongooseModels
            .map((userMongooseModel) => {
                const user = new User(
                    userMongooseModel?._id.toString() ?? '',
                    userMongooseModel?.username ?? '',
                    userMongooseModel?.password ?? '',
                );
                user.setEmail = userMongooseModel?.email ?? '';
                return user;
            });
    }

    /**
     * Finds and returns a given User
     * @param {string} uid The primary ID of the User
     * @return {User} The User with the matching ID
     */
    async findUserById(uid: string): Promise<User> {
        const userMongooseModel = await UserModel.findById(uid);
        const user = new User(
            userMongooseModel?._id.toString() ?? '',
            userMongooseModel?.username ?? '',
            userMongooseModel?.password ?? '',
        );
        user.setEmail = userMongooseModel?.email ?? '';
        return user;
    }

    /**
     * Stores and returns the given User
     * @param {User} user The User to be stored
     * @return {User} The User object that was stored
     */
    async createUser(user: User): Promise<User> {
        const userMongooseModel = await UserModel.create(user);
        const newUser = new User(
            userMongooseModel?._id.toString() ?? '',
            userMongooseModel?.username ?? '',
            userMongooseModel?.password ?? '',
        );
        newUser.setEmail = userMongooseModel?.email ?? '';
        return newUser;
    }

    /**
     * Deletes an existing User record
     * @param {string} uid The primary ID of the User to be removed
     * @return {number} The number of records deleted
     */
    async deleteUser(uid: string): Promise<any> {
        return UserModel.deleteOne({_id: uid});
    }

    /**
     * Deletes an existing User record by a given username
     * @param {string} username The username the User to be removed
     * @return {number} The number of records deleted
     */
    async deleteUsersByUsername(username: string): Promise<any> {
        return UserModel.deleteMany({username: username})
    }

    /**
     * Updates an existing User record's username and password
     * @param {string} uid The primary ID of the User to update
     * @param {User} user The User object containing the new username and password
     * @return {number} The number of records updated
     */
    async updateUser(uid: string, user: User): Promise<any> {
        return UserModel.updateOne({_id: uid}, {$set: {
                username: user.uName,
                password: user.pass,
                email: user.userEmail,
            }}
        );
    }
}
