import { Injectable } from '@nestjs/common';
import { SailscallsService } from 'src/sailscallsService/sailscalls.service';
import { AddItemDto } from './dto/add-item.dto';

@Injectable()
export class ContractService {
    constructor(private sailsCallsService: SailscallsService) {}

    async addItem(data: AddItemDto) {
        // this.sailsCallsService.command()({
        //     serviceName: 'Items',
        //     methodName: 'AddItemService',

        // });
        // return await this.sailsCallsService.post('contract/add-item', data);
    }
}
