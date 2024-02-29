import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
// import { usersProviders } from './user.provider';
import { UsersController } from './users.controller';
import { MulterModule } from '@nestjs/platform-express';
import * as  multer from 'multer';


@Module({
    imports:[
        MulterModule.register({
          storage: multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, './uploads')
            },
            filename: function (req, file, cb) {
              cb(null, `${Date.now()}-${file.originalname}`)
            }
          })
        })],
    providers: [UsersService],
    exports: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
