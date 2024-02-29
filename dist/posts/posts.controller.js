"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const create_post_dto_1 = require("./dto/create-post.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const comment_post_dto_1 = require("./dto/comment-post.dto");
const like_post_dto_1 = require("./dto/like-post.dto");
const platform_express_1 = require("@nestjs/platform-express");
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    create(file, createPostDto) {
        return this.postsService.create(file, createPostDto);
    }
    Comment(CommentPostDto, res) {
        return this.postsService.comment(CommentPostDto, res);
    }
    Like(LikePostDto, res) {
        return this.postsService.like(LikePostDto, res);
    }
    getAllLikes(userId, res) {
        return this.postsService.getAllLikesByUserId(userId, res);
    }
    getAllCommetns(userId, res) {
        return this.postsService.getAllCommentsByUserId(userId, res);
    }
    getAllCommentsByPost(postId, res) {
        return this.postsService.getAllCommentsByPostId(postId, res);
    }
    getAllLikesByPost(postId, res) {
        return this.postsService.getAllLikesByPostId(postId, res);
    }
    getAllPostById(userId, res) {
        return this.postsService.getAllPostById(userId, res);
    }
    getAllPost(res) {
        return this.postsService.getAllPost(res);
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "To add post" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Sucessfully post created' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiSecurity)('JWT-auth'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('url')),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "To add comment" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Comment saved succesffuly' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiSecurity)('JWT-auth'),
    (0, common_1.Post)('/comment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_post_dto_1.CommentPostDto, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "Comment", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "To add likes" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Likes saved succesffuly' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiSecurity)('JWT-auth'),
    (0, common_1.Post)('/likes'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [like_post_dto_1.LikePostDto, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "Like", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "To get all likes by id" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'All likes' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiSecurity)('JWT-auth'),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'The ID of the user' }),
    (0, common_1.Post)('/likesById/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getAllLikes", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "To get all comments by id" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'All comments' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiSecurity)('JWT-auth'),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'The ID of the user' }),
    (0, common_1.Post)('/commentsById/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getAllCommetns", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "To get all comments by Post" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'All comments' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiSecurity)('JWT-auth'),
    (0, swagger_1.ApiParam)({ name: 'postId', description: 'The ID of the post' }),
    (0, common_1.Post)('/commentsByPost/:postId'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getAllCommentsByPost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "To get all likes by post" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'All likes' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiSecurity)('JWT-auth'),
    (0, swagger_1.ApiParam)({ name: 'postId', description: 'The ID of the post' }),
    (0, common_1.Post)('/likesByPost/:postId'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getAllLikesByPost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "To get all post by user id" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'All posts' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiSecurity)('JWT-auth'),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'The ID of the user' }),
    (0, common_1.Post)('/post/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getAllPostById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "To get all post" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'All posts' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiSecurity)('JWT-auth'),
    (0, common_1.Get)('/allPosts'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getAllPost", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('posts'),
    (0, swagger_1.ApiTags)('posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map