import { Injectable } from '@nestjs/common';
import { UserSchema } from './user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async findUserByEmail(email: string){
        const user = await this.userModel.findOne({
            email: email
        });
        return user;
    }

    async CreateUser(email: string, password: string){
        const newUser = new this.userModel({email, password});
        await newUser.save();
        return newUser;
    }
}
