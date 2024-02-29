"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const models_1 = require("../../models");
let UsersService = class UsersService {
    async createUser(userDto) {
        try {
            const user = await this.findOne(userDto.username);
            if (!user) {
                const userData = await models_1.User.create({
                    username: userDto.username,
                    name: userDto.name,
                    dob: userDto.dob,
                    email: userDto.email,
                    password: bcrypt.hashSync(userDto.password, 10)
                });
                return userData;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async findOne(username) {
        try {
            const user = await models_1.User.findOne({ where: { username: username } });
            return user;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map