/**
 * @file The interface that all of our data access objects (DAOs) dealing with
 * Users must implement
 */

import User from "./User";

/**
 * The interface for any User DAOs
 * @interface UserDaoI
 */
export default interface UserDaoI {
    findAllUsers(): Promise<User[]>;
    findUserById(uid: string): Promise<User>;
    createUser(user: User): Promise<User>;
    updateUser(uid: string, user: User): Promise<any>;
    deleteUser(uid: string): Promise<any>;
    deleteUsersByUsername(username: string): Promise<any>;
    findUserByUsername(username: string): Promise<User>;
}
