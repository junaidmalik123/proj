import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { authDto } from './dto/auth.dto';
export declare class AuthService {
    private readonly userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    getByEmail(authDto: authDto): Promise<any>;
    getUserProfile(userId: any, res: any): Promise<any>;
    updateUserProfile(userId: any, req: any, res: any): Promise<any>;
    changePassword(req: any, body: any): Promise<any>;
}
