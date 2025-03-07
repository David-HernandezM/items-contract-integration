import { IsString, Min } from "class-validator";

export class CreateKeyringDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}