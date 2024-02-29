"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const db = require("../../models");
const cloudinary = require("../utils/cloudnary");
const Posts = db.Posts;
const Comment = db.CommentsBy;
const Like = db.LikesBy;
const User = db.User;
const LikesBy = db.LikesBy;
const CommentsBy = db.CommentsBy;
let PostsService = class PostsService {
    async create(file, createPostDto) {
        const result = await cloudinary.uploader.upload(file?.path);
        const post = await Posts.create({
            userId: createPostDto.userId,
            post_type: createPostDto.post_type,
            title: createPostDto.title,
            url: result.secure_url
        });
        if (post) {
            return {
                status: true,
                description: 'post created successfully',
                result: post
            };
        }
        else {
            return {
                status: false,
                description: 'post not created successfully',
                result: []
            };
        }
    }
    async comment(CommentPostDto, res) {
        try {
            const comment = await Comment.create(CommentPostDto);
            if (comment) {
                return res.json({
                    status: true,
                    message: 'Comment saved succesffuly',
                    result: comment
                });
            }
            else {
                return res.json({
                    status: false,
                    message: 'Comment not saved succesffuly',
                    result: []
                });
            }
        }
        catch (error) {
            return res.json({
                status: false,
                message: 'something went wrong',
                result: []
            });
        }
    }
    async like(LikePostDto, res) {
        try {
            const like = await Like.create(LikePostDto);
            if (like) {
                return res.json({
                    status: true,
                    message: 'like saved succesffuly',
                    result: like
                });
            }
            else {
                return res.json({
                    status: false,
                    message: 'like not saved succesffuly',
                    result: []
                });
            }
        }
        catch (error) {
            return res.json({
                status: false,
                message: 'something went wrong',
                result: []
            });
        }
    }
    async getAllLikesByUserId(userId, res) {
        try {
            const likes = await User.findAll({
                include: [
                    {
                        model: LikesBy
                    }
                ],
                where: {
                    id: userId
                }
            });
            if (likes) {
                return res.json({
                    status: true,
                    message: 'All Likes',
                    result: likes
                });
            }
            else {
                return res.json({
                    status: false,
                    message: 'No Likes',
                    result: []
                });
            }
        }
        catch (error) {
            return res.json({
                status: false,
                message: error.message,
                result: []
            });
        }
    }
    async getAllCommentsByUserId(userId, res) {
        try {
            const comments = await User.findAll({
                include: [
                    {
                        model: CommentsBy
                    }
                ],
                where: {
                    id: userId
                }
            });
            if (comments) {
                return res.json({
                    status: true,
                    message: 'All comments',
                    result: comments
                });
            }
            else {
                return res.json({
                    status: false,
                    message: 'No comments',
                    result: []
                });
            }
        }
        catch (error) {
            return res.json({
                status: false,
                message: error.message,
                result: []
            });
        }
    }
    async getAllCommentsByPostId(postId, res) {
        try {
            const comments = await Posts.findAll({
                include: [
                    {
                        model: CommentsBy
                    }
                ],
                where: {
                    id: postId
                }
            });
            if (comments) {
                return res.json({
                    status: true,
                    message: 'All comments',
                    result: comments
                });
            }
            else {
                return res.json({
                    status: false,
                    message: 'No comments',
                    result: []
                });
            }
        }
        catch (error) {
            return res.json({
                status: false,
                message: 'something went wrong',
                result: []
            });
        }
    }
    async getAllLikesByPostId(postId, res) {
        try {
            const likes = await Posts.findAll({
                include: [
                    {
                        model: LikesBy
                    }
                ],
                where: {
                    id: postId
                }
            });
            if (likes) {
                return res.json({
                    status: true,
                    message: 'All Likes',
                    result: likes
                });
            }
            else {
                return res.json({
                    status: false,
                    message: 'No Likes',
                    result: []
                });
            }
        }
        catch (error) {
            return res.json({
                status: false,
                message: 'something went wrong',
                result: []
            });
        }
    }
    async getAllPostById(userId, res) {
        try {
            const likes = await User.findAll({
                include: [
                    {
                        model: Posts
                    }
                ],
                where: {
                    id: userId
                }
            });
            if (likes) {
                return res.json({
                    status: true,
                    message: 'All Posts',
                    result: likes
                });
            }
            else {
                return res.json({
                    status: false,
                    message: 'No Posts Found',
                    result: []
                });
            }
        }
        catch (error) {
            return res.json({
                status: false,
                message: error.message,
                result: []
            });
        }
    }
    async getAllPost(res) {
        try {
            const posts = await Posts.findAll({});
            if (posts) {
                return res.json({
                    status: true,
                    message: 'All Posts',
                    result: posts
                });
            }
            else {
                return res.json({
                    status: false,
                    message: 'No Posts Found',
                    result: []
                });
            }
        }
        catch (error) {
            return res.json({
                status: false,
                message: error.message,
                result: []
            });
        }
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)()
], PostsService);
//# sourceMappingURL=posts.service.js.map