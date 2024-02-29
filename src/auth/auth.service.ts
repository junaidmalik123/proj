import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { authDto } from './dto/auth.dto';
import * as db from '../../models'
const User = db.User
const secretKey = process.env.JWTKEY

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService,
    private jwtService: JwtService) { }

  async getByEmail(authDto: authDto): Promise<any> {
    const user = await this.userService.findOne(authDto.username)
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
    }

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
      })

      if (user) {
        return res.json({
          status: true,
          message: 'user profile fetched',
          result: user
        })
      }

      else {
        return res.json({
          status: false,
          message: 'user not found',
          result: []
        })
      }

    } catch (error) {
      return res.json({
        status: false,
        message: error.message,
        result: []
      })
    }
  }

  async updateUserProfile(userId, req, res) {
    try {

      console.log(req.body,"**************************")
      const user = await User.update( req.body ,{
        where: {
          id: userId
        }
      })

      if (user) {
        return res.json({
          status: true,
          message: 'user profile updatd successfully',
          result: user
        })
      }

      else {
        return res.json({
          status: false,
          message: 'user profile not updated',
          result: []
        })
      }

    } catch (error) {
      return res.json({
        status: false,
        message: error.message,
        result: []
      })
    }
  }


  async changePassword(req, body): Promise<any> {
    console.log(body.oldPassword, req.user.user.password)
    if (bcrypt.compareSync(body.oldPassword, req.user.user.password)) {
      const updatedUser = await User.update(
        { password: bcrypt.hashSync(body.newPassword, 10) },
        {
          where: {
            email: req.user.user.email
          },
        }
      );
      if (updatedUser) {
        return " password successfully changed"
      }
    }
    else {
      return " old password not matched with db password"
    }
  }


}
