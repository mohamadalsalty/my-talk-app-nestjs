import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from 'class-validator';


export class CreateCommentDto {
    @Length(1, 255)
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Hello world!',
        description: 'The comment',
    })
    content: string;
}
