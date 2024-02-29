import { ApiProperty } from "@nestjs/swagger";

export class authDto {
    @ApiProperty()
    readonly username: string;
    @ApiProperty()
    readonly password: string;
}


  