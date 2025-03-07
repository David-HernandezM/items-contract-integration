import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { KeyringService } from './keyring.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { HexString } from '@gear-js/api';

@Controller('keyring')
export class KeyringController {
    constructor(private keyringService: KeyringService) {}

    @UseGuards(JwtGuard)
    @Get(':address')
    async getWalletData(@Param('address') address: HexString) {
        return await this.keyringService.keyringDataByAddress(address);
    }
}
