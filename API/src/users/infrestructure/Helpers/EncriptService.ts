import EncriptInterface from "../../aplication/service/EncriptInterface";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export default class EncriptService implements EncriptInterface {
    async hash(password: string): Promise<string> {
        const saltRounds = parseInt(process.env['SALT_ROUNDS'] ?? '5');
        return bcrypt.hash(password, saltRounds);
    }

    async compare(hash_password: string, plain_password: string): Promise<boolean> {
        return bcrypt.compare(plain_password, hash_password);
    }
}