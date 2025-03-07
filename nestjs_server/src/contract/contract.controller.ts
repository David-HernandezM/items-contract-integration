import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { SailscallsService } from 'src/sailscallsService/sailscalls.service';
import { AddItemDto } from './dto/add-item.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('contract')
export class ContractController {
    constructor(private sailsCallsService: SailscallsService) {}

    @UseGuards(JwtGuard)
    @Get('command/add-item')
    addItem(@Body() data: AddItemDto) {
        console.log('adding item!');
        return 'adding item!';
    }
}
