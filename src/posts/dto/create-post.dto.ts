import { ApiProperty } from "@nestjs/swagger";
export class CreatePostDto {
    @ApiProperty()
    readonly userId: string;
    @ApiProperty()
    readonly post_type: string;
    @ApiProperty()
    readonly title: string;
    @ApiProperty({ type: 'string', format: 'binary' })
    url: any
}



