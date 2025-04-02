import { UserService } from "../services";
import { Controller, controller, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import { UserInterface } from "../interface/userInterface";
import { TYPES } from "../utils/type";
import { Request,Response } from "express";


@controller('/user')
export class UserController{
    constructor(@inject(TYPES.UserService) private userService : UserService){}

    @httpPost('/insert-user')
    async addTask(req: Request, res: Response):Promise<void>{
        try{
            const {fname,lname,email,password,mobile,role} = req.body;
            const body: UserInterface = {fname,lname,email,password,mobile,role}
            await this.userService.createUser(body);
            res.status(200).json({message : "USER ADD SUCCESSFUL"});
        }
        catch(err){
            res.status(500).send(err.message);
        }
    }

    @httpPost('/login-user')
    async login(req: Request, res: Response): Promise<void> {
        try {
        const { email, password } = req.body
        const token = await this.userService.login(email, password)
        if (token) {
            res.status(200).json({token,message : "successfully login"})
        } else {
            res.status(500).json({message : "user not found"})
        }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}