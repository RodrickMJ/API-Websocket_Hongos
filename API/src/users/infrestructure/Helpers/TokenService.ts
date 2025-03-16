import jwt from "jsonwebtoken";
import TokenInterface from "../../aplication/service/TokenInterface";
import dotenv from "dotenv";

dotenv.config();

export default class TokenService implements TokenInterface {
    
    generateToken(id: string): string {
        return jwt.sign({
            id,
            success: true
        },
            process.env['JWT_SECRET'] ?? "DEFAULT_SECRET",
            {
                algorithm: 'HS256',
                expiresIn: 60 * 60
            }
    );
    }

    validateToken(token: string): boolean {
        try {
            jwt.verify(
                token,
                process.env["JWT_SECRET"] ?? "DEFAULT_SECRET",
                { algorithms: ['HS256'] }
            )

            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    getPayload(token: string): string | null {
        const decoded = jwt.decode(token) as { id?: string } | null;
        if (!decoded || !decoded.id) return null;
        return decoded.id;
    }
}