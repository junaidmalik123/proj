import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CommentPostDto } from './dto/comment-post.dto';
import { LikePostDto } from './dto/like-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard)
@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @ApiOperation({ summary: "To add post" })
  @ApiResponse({ status: 201, description: 'Sucessfully post created' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiSecurity('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('url'))
  @Post('/create')
  create(@UploadedFile() file: Express.Multer.File, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(file,createPostDto);
  }

  @ApiOperation({ summary: "To add comment" })
  @ApiResponse({ status: 201, description: 'Comment saved succesffuly' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiSecurity('JWT-auth')
  @Post('/comment')
  Comment(@Body() CommentPostDto: CommentPostDto, @Res() res) {
    return this.postsService.comment(CommentPostDto, res);
  }

  @ApiOperation({ summary: "To add likes" })
  @ApiResponse({ status: 201, description: 'Likes saved succesffuly' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiSecurity('JWT-auth')
  @Post('/likes')
  Like(@Body() LikePostDto: LikePostDto, @Res() res) {
    return this.postsService.like(LikePostDto, res);
  }

  @ApiOperation({ summary: "To get all likes by id" })
  @ApiResponse({ status: 201, description: 'All likes' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiSecurity('JWT-auth')
  @ApiParam({ name: 'userId', description: 'The ID of the user' })
  @Post('/likesById/:userId')
  getAllLikes(@Param('userId') userId, @Res() res) {
    return this.postsService.getAllLikesByUserId(userId, res);
  }

  @ApiOperation({ summary: "To get all comments by id" })
  @ApiResponse({ status: 201, description: 'All comments' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiSecurity('JWT-auth')
  @ApiParam({ name: 'userId', description: 'The ID of the user' })
  @Post('/commentsById/:userId')
  getAllCommetns(@Param('userId') userId, @Res() res) {
    return this.postsService.getAllCommentsByUserId(userId, res);
  }

  @ApiOperation({ summary: "To get all comments by Post" })
  @ApiResponse({ status: 201, description: 'All comments' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiSecurity('JWT-auth')
  @ApiParam({ name: 'postId', description: 'The ID of the post' })
  @Post('/commentsByPost/:postId')
  getAllCommentsByPost(@Param('postId') postId, @Res() res) {
    return this.postsService.getAllCommentsByPostId(postId, res);
  }

  @ApiOperation({ summary: "To get all likes by post" })
  @ApiResponse({ status: 201, description: 'All likes' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiSecurity('JWT-auth')
  @ApiParam({ name: 'postId', description: 'The ID of the post' })
  @Post('/likesByPost/:postId')
  getAllLikesByPost(@Param('postId') postId, @Res() res) {
    return this.postsService.getAllLikesByPostId(postId, res);
  }

  @ApiOperation({ summary: "To get all post by user id" })
  @ApiResponse({ status: 201, description: 'All posts' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiSecurity('JWT-auth')
  @ApiParam({ name: 'userId', description: 'The ID of the user' })
  @Post('/post/:userId')
  getAllPostById(@Param('userId') userId, @Res() res) {
    return this.postsService.getAllPostById(userId, res);
  }

  @ApiOperation({ summary: "To get all post" })
  @ApiResponse({ status: 201, description: 'All posts' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiSecurity('JWT-auth')
  @Get('/allPosts')
  getAllPost(@Res() res) {
    return this.postsService.getAllPost(res);
  }



}
