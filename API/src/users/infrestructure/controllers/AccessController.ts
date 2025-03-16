import { Request, Response } from "express";
import AccessUseCase from "../../aplication/AccessUseCase";
import UserRequest from "../../domain/DTOS/UserRequest";

export default class AccessController {
    constructor(readonly userUseCase: AccessUseCase){}

    async run (req: Request, res: Response){
        const {name, password, email}: UserRequest = req.body;
        
        if(!name || !email || !password){
            res.status(400).json({
                msg: "If required all camps",
                data: null
            });
            return;
        }

        try {
            const result = await this.userUseCase.run({name, password, email});

            const response = result
            ? { status: 200, msg: 'Access Successfully', data: result}
            : { status: 404, msg: 'User not found', data: null};

            res.status(response.status).json({
                data: response.data,
                msg: response.msg
            })
            return;

        } catch (error) {
            console.log(error)
            res.status(500).json({
                data: null,
                msg: 'Internal Server Error'
            })
        }
    }
}