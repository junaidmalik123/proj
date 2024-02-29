import { UserDto } from './dto/user.dto';
export declare class UsersService {
    createUser(userDto: UserDto): Promise<any>;
    findOne(username: string): Promise<any>;
}
