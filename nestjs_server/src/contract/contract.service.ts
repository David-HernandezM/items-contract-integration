import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SailscallsService } from 'src/sailscallsService/sailscalls.service';
import { AddItemDto } from './dto/add-item.dto';
import { KeyringData } from 'src/keyring/dto/keyring.dto';
import { Signer } from '@polkadot/api/types';

@Injectable()
export class ContractService {
    constructor(private sailsCallsService: SailscallsService) {}

    async addItem(data: AddItemDto, signerData: KeyringData) {
        const sailsCallsInstance = this.sailsCallsService.sailsInstance();
        try {
            await this.sailsCallsService.checkVoucher(
                signerData.keyringAddress,
                signerData.keyringVoucherId
            );
        } catch (e) {
            throw new UnauthorizedException('Voucher is not set for user');
        }

        try {
            const signer = sailsCallsInstance.unlockKeyringPair(
                signerData.lockedKeyringData, 
                signerData.password
            );

            const response = await sailsCallsInstance.command({
                serviceName: 'Items',
                methodName: 'AddItemService',
                signerData: signer,
                voucherId: signerData.keyringVoucherId,
                callArguments: [
                    data.itemId,
                    data.item,
                    data.address
                ],
            });

            return {
                message: 'item added',
                contractMessage: response
            };
        } catch (e) {
            throw new UnauthorizedException('Error while adding item');
        }
    }

    async modifyItem(data: AddItemDto, signerData: KeyringData) {
        const sailsCallsInstance = this.sailsCallsService.sailsInstance();
        try {
            await this.sailsCallsService.checkVoucher(
                signerData.keyringAddress,
                signerData.keyringVoucherId
            );
        } catch (e) {
            throw new UnauthorizedException('Voucher is not set for user');
        }

        try {
            const signer = sailsCallsInstance.unlockKeyringPair(
                signerData.lockedKeyringData, 
                signerData.password
            );

            const response = await sailsCallsInstance.command({
                serviceName: 'Items',
                methodName: 'ModifyItemService',
                signerData: signer,
                voucherId: signerData.keyringVoucherId,
                callArguments: [
                    data.itemId,
                    data.item,
                ],
            });

            return {
                message: 'item modified',
                contractMessage: response
            };
        } catch (e) {
            throw new UnauthorizedException('Error while adding item');
        }
    }

    async removeItem(itemId: number, signerData: KeyringData) {
        const sailsCallsInstance = this.sailsCallsService.sailsInstance();
        try {
            await this.sailsCallsService.checkVoucher(
                signerData.keyringAddress,
                signerData.keyringVoucherId
            );
        } catch (e) {
            throw new UnauthorizedException('Voucher is not set for user');
        }

        try {
            const signer = sailsCallsInstance.unlockKeyringPair(
                signerData.lockedKeyringData, 
                signerData.password
            );

            const response = await sailsCallsInstance.command({
                serviceName: 'Items',
                methodName: 'RemoveItemService',
                signerData: signer,
                voucherId: signerData.keyringVoucherId,
                callArguments: [
                    itemId
                ],
            });

            return {
                message: 'item deleted',
                contractMessage: response
            };
        } catch (e) {
            throw new UnauthorizedException('Error while adding item');
        }
    }


    async allItems() {
        const sailsCallsInstance = this.sailsCallsService.sailsInstance();

        try {
            const response = await sailsCallsInstance.query({
                serviceName: 'Items',
                methodName: 'AllItemsQuery',
            });

            return {
                message: 'all items',
                contractMessage: response
            };
        } catch (e) {
            throw new UnauthorizedException('Error while adding item');
        }
    }

    async itemById(itemId: number) {
        const sailsCallsInstance = this.sailsCallsService.sailsInstance();

        let response;

        try {
            response = await sailsCallsInstance.query({
                serviceName: 'Items',
                methodName: 'ItemByIdQuery',
                callArguments: [
                    itemId
                ]
            });
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException('Cant make the contract query');
        }

        if (!response) {
            throw new NotFoundException(`Item with id ${itemId} not found`);
        }

        return {
            message: 'item by id',
            contractMessage: response
        };
    }

    async queryCall() {
        const sailsCallsInstance = this.sailsCallsService.sailsInstance();

        try {
            const response = await sailsCallsInstance.query({
                serviceName: 'Items',
                methodName: 'Query'
            });

            return {
                message: 'query',
                contractMessage: response
            };
        } catch (e) {
            throw new UnauthorizedException('Error while adding item');
        }
    }

    async totalItems() {
        const sailsCallsInstance = this.sailsCallsService.sailsInstance();

        try {
            const response = await sailsCallsInstance.query({
                serviceName: 'Items',
                methodName: 'TotalItemsQuery'
            });

            return {
                message: 'query',
                contractMessage: response
            };
        } catch (e) {
            throw new UnauthorizedException('Error while adding item');
        }
    }
}
