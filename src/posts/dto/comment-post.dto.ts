import { ApiProperty } from "@nestjs/swagger";
export class CommentPostDto {
    @ApiProperty()
    readonly postId: string;
    @ApiProperty()
    readonly userId: string;
    @ApiProperty()
    readonly comments: string;
}