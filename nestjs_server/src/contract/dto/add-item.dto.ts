import { HexString } from "@gear-js/api";
import { IsNumber, IsString } from "class-validator"

export class AddItemDto {
    @IsNumber()
    itemId: number;
    @IsString()
    address: HexString;
    
    item: {
        name: string;
        description: string;
        image: string;
    };
}