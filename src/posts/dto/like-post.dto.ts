import { ApiProperty } from "@nestjs/swagger";
export class LikePostDto {
    @ApiProperty()
    readonly postId: string;
    @ApiProperty()
    readonly userId: string;

}