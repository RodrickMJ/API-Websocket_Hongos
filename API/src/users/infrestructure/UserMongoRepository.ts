import UserRequest from "../domain/DTOS/UserRequest";
import User from "../domain/User";
import UserRepository from "../domain/UserRepository";
import UserModel from "../../config/DB/ModelUser";
import SPRC from "../domain/DTOS/SPRC";

export default class UserMongoRepository implements UserRepository {
    constructor(readonly model: typeof UserModel) {}

    async access(user: UserRequest): Promise<User | null> {
        const userFound = await this.findUser(user.name, user.email);
        return userFound || null;
    }

    async add(user: UserRequest): Promise<User | null> {
        try {
            const isExistedUser = await this.findUser(user.name, user.email);
            if (isExistedUser) return null;

            const newUser = await this.model.create({
                name: user.name,
                email: user.email,
                password: user.password,
                rol: 'Administrador'
            });

            return{
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                rol: newUser.rol
            }

        } catch (error) {
            console.error('Error trying to add user to database', error);
            throw new Error('Error accessing to database');
        }
    }

    async storePasswordRC(request: SPRC): Promise<void> {
        try {
            await this.model.updateOne({
                _id: request.userId
            }, {
                passwordResetCode: request.code,
                passwordResetExpires: request.expires
            });
        } catch (error) {
            console.error('Error storing pasword reset code: ', error);
            throw new Error('Could not store password reset code');
        }
    }

    async findUser(name: string, email: string): Promise<User | null> {
        try {
            const userFound = await this.model.findOne({name,email});
            if (!userFound) return null;

            return{
                id: userFound.id,
                name: userFound.name,
                email: userFound.email,
                password: userFound.password,
                rol: userFound.rol
            };

        } catch (error) {
            console.error('Error trying to search for user in database:', error);
            throw new Error('Error accessing to database');
        }
    }

    async findUserByPK(id: string): Promise<User | null> {
        try {
            const user = await this.model.findById(id);
            if (!user) return null;

            return{
                id: user.id,
                name: user.name,
                email: user.email,
                password: 'Encripted',
                rol: user.rol,
                passwordResetCode: user.passwordResetCode,
                passwordResetExpire: user.passwordResetExpires

            };

        } catch (error) {
            console.error('Error trying to search for user indatabase: ', error);
            throw new Error('Error accesing to database');
        }
    }

    async resetPassword(userId: string, newPassword: string): Promise<void> {
        try {
            await this.model.findByIdAndUpdate(userId, {
                password: newPassword
            });
        } catch (error) {
            console.error('Error trying to serach user in database: ', error);
            throw new Error('Error accesing to database');
        }
    }
}