import { Request, Response } from "express";
import AddUseCase from "../../aplication/AddUseCase";
import UserRequest from "../../domain/DTOS/UserRequest";

export default class AddController {
    constructor(readonly addUseCase: AddUseCase) {}

    async run(req: Request, res: Response){ 
        try {
            const { email, name, password }: UserRequest = req.body;
            const result = await this.addUseCase.run({ email, name, password });

            if (!result) {
                res.status(409).json({
                    data: {
                        attempted: {
                            email,
                            name
                        }
                    },
                    msg: "User already exists"
                });
                return;
            }

            res.status(201).json({
                data: result,
                msg: 'User Created successfully'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                data: null,
                msg: 'Internal Server Error'
            });
        }
    }
}
