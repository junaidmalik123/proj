import { CreatePostDto } from './dto/create-post.dto';
export declare class PostsService {
    create(file: any, createPostDto: CreatePostDto): Promise<{
        status: boolean;
        description: string;
        result: any;
    }>;
    comment(CommentPostDto: any, res: any): Promise<any>;
    like(LikePostDto: any, res: any): Promise<any>;
    getAllLikesByUserId(userId: any, res: any): Promise<any>;
    getAllCommentsByUserId(userId: any, res: any): Promise<any>;
    getAllCommentsByPostId(postId: any, res: any): Promise<any>;
    getAllLikesByPostId(postId: any, res: any): Promise<any>;
    getAllPostById(userId: any, res: any): Promise<any>;
    getAllPost(res: any): Promise<any>;
}
