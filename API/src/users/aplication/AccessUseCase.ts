import UserRepository from "../domain/UserRepository";
import UserRequest from "../domain/DTOS/UserRequest";
import UserResponse from "../domain/DTOS/UserResponse";
import EncriptInterface from "./service/EncriptInterface";
import TokenInterface from "./service/TokenInterface";

export default class AccessUseCase {
    constructor(
        readonly tokenService: TokenInterface,
        readonly encriptService: EncriptInterface,
        readonly userRepository: UserRepository
    ) {}

    async run(user: UserRequest): Promise<UserResponse | null> {
        const userFounded = await this.userRepository.access(user);
        if (!userFounded) return null;

        const isPasswordValid = await this.encriptService.compare(userFounded.password, user.password);
        if (!isPasswordValid) return null;

        const response: UserResponse = {
            id: userFounded.id.toString(),
            email: userFounded.email,
            name: userFounded.name,
            rol: userFounded.rol,
            token: this.tokenService.generateToken(userFounded.id)
        }

        return response;
    }
}