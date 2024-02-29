import { Body, Controller, Post, Get, Request, UseGuards, Param, UseInterceptors, UploadedFile, Res, Req, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { authDto } from './dto/auth.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: "To login" })
  @ApiResponse({ status: 201, description: 'Sucessfully logged In.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post("/login")
  async getUser(@Body() authDto: authDto, @Request() req): Promise<any> {
    const response = await this.authService.getByEmail(authDto)
    if (response.status) {
      req.session.token = response.access_token
      return response
    }
    else {
      return response
    }

  }


  @ApiOperation({ summary: "To change password" })
  @ApiResponse({ status: 201, description: 'Password changed successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    description: 'Your request body description',
    schema: {
      type: 'object',
      properties: {
        oldPassword: { type: 'string' },
        newPassword: { type: 'string' },
        // Add more properties as needed
      },
    },
  })
  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @Post('change-password')
  changePassword(@Request() req, @Body() body) {
    console.log("********change password **********");
    console.log(req.user.user.password)
    return this.authService.changePassword(req, body);
  }

  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "To get user profile" })
  @ApiResponse({ status: 201, description: 'User Profile Fetched' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'userId', description: 'The ID of the user' })
  @Post("/user-profile/:userId")
  async getUserProfile(@Param('userId') userId, @Res() res): Promise<any> {
    return await this.authService.getUserProfile(userId, res)
  }

  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "To update user profile" })
  @ApiResponse({ status: 201, description: 'User Profile updated' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'userId', description: 'The ID of the user' })
  @Put("/update/:userId")
  async updateUserProfile(@Param('userId') userId, @Req() req,  @Res() res): Promise<any> {
    return await this.authService.updateUserProfile(userId, req, res)
  }


}
