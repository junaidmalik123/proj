import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty()
    readonly username: string;
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly dob: Date;
    @ApiProperty()
    readonly email: string;
    @ApiProperty()
    readonly password:string

}