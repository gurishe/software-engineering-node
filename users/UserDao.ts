import User from "./User";
import UserModel from "./UserModel";
import UserDaoI from "./UserDaoI";

export default class UserDao implements UserDaoI {
    private static userDao: UserDaoI | null = null;

    public static getInstance = (): UserDaoI => {
        if (UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }

    async findAllUsers(): Promise<User[]> {
        const userMongooseModels = await UserModel.find();
        return userMongooseModels
            .map((userMongooseModel) => {
                return new User(
                    userMongooseModel?._id.toString() ?? '',
                    userMongooseModel?.username ?? '',
                    userMongooseModel?.password ?? '',
                );
            });
    }

    async findUserById(uid: string): Promise<User> {
        const userMongooseModel = await UserModel.findById(uid);
        return new User(
            userMongooseModel?._id.toString()??'',
            userMongooseModel?.username??'',
            userMongooseModel?.password??'',
        );
    }

    async createUser(user: User): Promise<User> {
        const userMongooseModel = await UserModel.create(user);
        return new User(
            userMongooseModel?._id.toString()??'',
            userMongooseModel?.username??'',
            userMongooseModel?.password??'',
        );
    }

    async deleteUser(uid: string): Promise<any> {
        return UserModel.deleteOne({_id: uid});
    }

    async updateUser(uid: string, user: any): Promise<any> {
        return UserModel.updateOne({_id: uid}, {$set: {
                username: user.username,
                password: user.password
            }}
        );
    }
}
