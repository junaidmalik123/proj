/// <reference types="multer" />
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { CommentPostDto } from './dto/comment-post.dto';
import { LikePostDto } from './dto/like-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(file: Express.Multer.File, createPostDto: CreatePostDto): Promise<{
        status: boolean;
        description: string;
        result: any;
    }>;
    Comment(CommentPostDto: CommentPostDto, res: any): Promise<any>;
    Like(LikePostDto: LikePostDto, res: any): Promise<any>;
    getAllLikes(userId: any, res: any): Promise<any>;
    getAllCommetns(userId: any, res: any): Promise<any>;
    getAllCommentsByPost(postId: any, res: any): Promise<any>;
    getAllLikesByPost(postId: any, res: any): Promise<any>;
    getAllPostById(userId: any, res: any): Promise<any>;
    getAllPost(res: any): Promise<any>;
}
