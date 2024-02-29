import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as fs from 'fs';
import path from 'path';

@Module({
  imports: [MulterModule.registerAsync({
    useFactory: () => {
      return {
        storage: multer.diskStorage({}),
        // fileFilter: (req, file, cb) => {
        //   let ext = path.extname(file.originalname);
        //   if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        //     cb(new Error("Unsupported file type!"), false);
        //     return;
        //   }
        //   cb(null, true);
        // },
      };
    },
  }),],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule { }
