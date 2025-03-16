import UserRepository from "../domain/UserRepository";
import UserRequest from "../domain/DTOS/UserRequest";
import UserResponse from "../domain/DTOS/UserResponse";
import EncriptInterface from "./service/EncriptInterface";
import TokenInterface from "./service/TokenInterface";

export default class AddUseCase {
    constructor(
        readonly encryptService: EncriptInterface,
        readonly tokenService: TokenInterface,
        readonly userRepository: UserRepository
    ) {}

    async run (userRequest: UserRequest):Promise <UserResponse | null> {
        userRequest.password = await this.encryptService.hash(userRequest.password);
        const result = await this.userRepository.add(userRequest);
        if (!result) return null;

        const response: UserResponse = {
            id: result.id,
            name: result.name,
            email: result.email,
            rol: result.rol,
            token: this.tokenService.generateToken(result.id)
        }

        return response;
    }
}