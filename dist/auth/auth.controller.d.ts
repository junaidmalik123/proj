import { AuthService } from './auth.service';
import { authDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getUser(authDto: authDto, req: any): Promise<any>;
    changePassword(req: any, body: any): Promise<any>;
    getUserProfile(userId: any, res: any): Promise<any>;
    updateUserProfile(userId: any, req: any, res: any): Promise<any>;
}
