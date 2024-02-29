import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { User } from '../../models'; // Assuming User is the correct export in your models

@Injectable()
export class UsersService {

    async createUser(userDto: UserDto): Promise<any> {
        try {
            const user = await this.findOne(userDto.username);

            if (!user) {
                const userData = await User.create({
                    username: userDto.username,
                    name: userDto.name,
                    dob: userDto.dob,
                    email: userDto.email,
                    password: bcrypt.hashSync(userDto.password, 10)
                });
                return userData;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            throw error; 
        }
    }

    async findOne(username: string): Promise<any> {
        try {
            const user = await User.findOne({ where: { username: username } });
            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
