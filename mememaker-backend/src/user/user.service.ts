import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}

  async create(user: UserDocument): Promise<UserDocument> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async findOne(username: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ username }).exec();
  }
}
