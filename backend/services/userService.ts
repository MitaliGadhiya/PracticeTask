import { UserModel } from "../models";
import { injectable } from "inversify";
import jwt from 'jsonwebtoken'
const secretkey = 'Mitali@321'

@injectable()
export class UserService {

    async createUser(body : any) : Promise<void>{
        const {fname,lname,email,password,mobile,role} = body
        const sanitizedBody =  { fname,lname,email,password,mobile,role}
        const newUser = new UserModel(sanitizedBody)
        await newUser.save()
    }

    async login(email: string, password: string): Promise<String | any> {
        const user = await UserModel.findOne({ email, password})
        if (user) {
          const role = user.role
          const _id = user._id
          const token = jwt.sign({ email, role, _id }, secretkey, {
            expiresIn: '1h'
          })
          return token
        } else {
          return null
        }
      }

}