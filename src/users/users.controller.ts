import { Controller, Post, Body, UseGuards, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';


@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly userService: UsersService) { }
  @ApiOperation({ summary: "To Registered a user" })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    description: 'create a user',
    type: UserDto,
  })
  @Post("/create")
  async createUser(@Body() UserDto: UserDto): Promise<any> {
    const response = await this.userService.createUser(UserDto)
    if (response)
      return {
        status: true,
        message: "User Registered successfully.",
        result: response
      };
    else
      return {
        status: false,
        message: "User is already registered",
        result:[]
      };
  }


}
