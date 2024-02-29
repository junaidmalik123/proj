import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[UsersModule,
    JwtModule.register({
    global: true,
    secret: process.env.JWTKEY,
   // signOptions: { expiresIn: '360s' },
  }), 
  // MulterModule.register({
  //   storage: multer.diskStorage({
  //     destination: function (req, file, cb) {
  //       cb(null, './uploads')
  //     },
  //     filename: function (req, file, cb) {
  //       cb(null, `${Date.now()}-${file.originalname}`)
  //     }
  //   })
  //  })
],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
