import EncriptService from "./Helpers/EncriptService";
import TokenService from "./Helpers/TokenService";
import UserMongoRepository from "./UserMongoRepository";
import UserModel from "../../config/DB/ModelUser";
import AddUseCase from "../aplication/AddUseCase";
import AddController from "./controllers/AddController";
import AccessUseCase from "../aplication/AccessUseCase";
import AccessController from "./controllers/AccessController";

const userMongoRepository = new UserMongoRepository(UserModel);
const encryptService = new EncriptService();
const tokenService = new TokenService();

const addUseCase = new AddUseCase(encryptService, tokenService, userMongoRepository);
const accessUseCase = new AccessUseCase(tokenService,encryptService, userMongoRepository);

export const addController = new AddController(addUseCase);
export const accessController = new AccessController(accessUseCase);