import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    createUser(UserDto: UserDto): Promise<any>;
}
