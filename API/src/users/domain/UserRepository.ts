import UserRequest from "./DTOS/UserRequest";
import User from "./User";
import SPRC from "./DTOS/SPRC";

export default interface UserRepository {
    access(user: UserRequest): Promise<User | null>;
    add(user: UserRequest):Promise<User | null>
    findUser(name: string, email: string): Promise<User | null>;
    findUserByPK(id: string): Promise<User | null>;

    //para el restablecimiento de la contraseña
    storePasswordRC(request: SPRC): Promise<void>;
    resetPassword(userId: string, newPassword: string): Promise<void>;
}