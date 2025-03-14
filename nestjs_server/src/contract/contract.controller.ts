import { Body, Controller, Delete, Get, Param, Post,  Put,  UseGuards } from '@nestjs/common';
import { ContractService } from './contract.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('contract')
export class ContractController {
    constructor(private contractService: ContractService) {}

    @UseGuards(JwtGuard)
    @Post('command/add-item')
    async addItem(@Body() data: any) {
        return await this.contractService.addItem(data, data.user.sub);
    }

    @UseGuards(JwtGuard)
    @Put('command/edit-item')
    async editItem(@Body() data: any) {
        return await this.contractService.modifyItem(data, data.user.sub);
    }

    @UseGuards(JwtGuard)
    @Delete('command/remove-item')
    async removeItem(@Body() data: any) {
        return await this.contractService.removeItem(data.itemId, data.user.sub);
    }

    @Get('query/get-items')
    async allItems() {
        return await this.contractService.allItems();
    }

    @Get('query/get-item/:id')
    async itemById(@Param('id') id: number) {
        return await this.contractService.itemById(id);
    }

    @Get('query/query')
    async queryCall() {
        return await this.contractService.queryCall();
    }

    @Get('query/total-items')
    async totalItems() {
        return await this.contractService.totalItems();
    }
}
