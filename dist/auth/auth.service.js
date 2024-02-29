"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const db = require("../../models");
const User = db.User;
const secretKey = process.env.JWTKEY;
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async getByEmail(authDto) {
        const user = await this.userService.findOne(authDto.username);
        if (!user) {
            return ({
                status: false,
                message: "User not found.",
                result: {}
            });
        }
        if (!await bcrypt.compare(authDto.password, user.password)) {
            return ({
                status: false,
                message: "Wrong Password. PLease enter correct Password",
                result: {}
            });
        }
        const payload = {
            id: user.id,
            username: user.username,
            name: user.name,
            dob: user.dob,
            email: user.email,
        };
        return {
            status: true,
            message: "Token send successfuly.",
            access_token: await this.jwtService.signAsync({ payload }, { secret: secretKey }),
            name: user.username,
            id: user.id
        };
    }
    async getUserProfile(userId, res) {
        try {
            const user = await User.findOne({
                where: {
                    id: userId
                }
            });
            if (user) {
                return res.json({
                    status: true,
                    message: 'user profile fetched',
                    result: user
                });
            }
            else {
                return res.json({
                    status: false,
                    message: 'user not found',
                    result: []
                });
            }
        }
        catch (error) {
            return res.json({
                status: false,
                message: error.message,
                result: []
            });
        }
    }
    async updateUserProfile(userId, req, res) {
        try {
            console.log(req.body, "**************************");
            const user = await User.update(req.body, {
                where: {
                    id: userId
                }
            });
            if (user) {
                return res.json({
                    status: true,
                    message: 'user profile updatd successfully',
                    result: user
                });
            }
            else {
                return res.json({
                    status: false,
                    message: 'user profile not updated',
                    result: []
                });
            }
        }
        catch (error) {
            return res.json({
                status: false,
                message: error.message,
                result: []
            });
        }
    }
    async changePassword(req, body) {
        console.log(body.oldPassword, req.user.user.password);
        if (bcrypt.compareSync(body.oldPassword, req.user.user.password)) {
            const updatedUser = await User.update({ password: bcrypt.hashSync(body.newPassword, 10) }, {
                where: {
                    email: req.user.user.email
                },
            });
            if (updatedUser) {
                return " password successfully changed";
            }
        }
        else {
            return " old password not matched with db password";
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map