import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateKeyringDto } from './dto/create-keyring.dto';
import { SailscallsService } from 'src/sailscallsService/sailscalls.service';
import { decodeAddress, type HexString } from '@gear-js/api';
import { 
    INITIAL_BLOCKS_FOR_VOUCHER, 
    INITIAL_VOUCHER_TOKENS 
} from 'src/consts';
import type { IFormatedKeyring } from 'sailscalls';
import type { IKeyringPair } from "@polkadot/types/types";
import * as CryptoJs from 'crypto-js';

@Injectable()
export class KeyringService {
    constructor(private sailsService: SailscallsService) {}

    async createKeyring(keyringData: CreateKeyringDto) {
        const { username, password } = keyringData;

        const hashedUsername = this.encryptString(username);
        const hashedPassword = this.encryptString(password);

        const userKeyringAddress = await this.userKeyringAddress(username);

        if (userKeyringAddress) {
            throw new ConflictException('username already exists');
        }

        const sailsInstance = this.sailsService.sailsInstance();

        const newKeyringPair = await sailsInstance.createNewKeyringPair(username);
        const lockedKeyringPair = sailsInstance.lockkeyringPair(
            newKeyringPair, 
            hashedPassword
        );
        // const formatedLockedKeyringPair = sailsInstance.modifyPairToContract(lockedKeyringPair);
        const formatedLockedKeyringPair = sailsInstance.changeLockedKeyringPairForContract(lockedKeyringPair);
        let keyringVoucherId = '';

        try {
            keyringVoucherId = await sailsInstance.createVoucher({
                userAddress: decodeAddress(newKeyringPair.address),
                initialExpiredTimeInBlocks: INITIAL_BLOCKS_FOR_VOUCHER,
                initialTokensInVoucher: INITIAL_VOUCHER_TOKENS,
                callbacks: {
                    onLoad() { console.log('Issue voucher to signless account...') },
                    onSuccess() { console.log('Voucher created for signless account!') },
                    onError() { console.log('Error while issue voucher to signless') }
                }
            });
        } catch(e) {
            console.log('Error while issue a voucher to a singless account!');
            console.log(e);
            throw new InternalServerErrorException(e);
        }

        await this.registerKeyringPair(
            newKeyringPair,
            keyringVoucherId as HexString,
            hashedUsername,
            formatedLockedKeyringPair
        );

        return 'Keyring created successfully';
    }

    async userKeyringAddress(username: string) {
        const hashedUsername = this.encryptString(username);
        const response = await this.sailsService.query()({
            serviceName: 'Signless',
            methodName: 'KeyringAddressFromUserCodedName',
            callArguments: [
                hashedUsername
            ]
        });
        const { signlessAccountAddress } = response;

        return signlessAccountAddress;
    }

    async userKeyringData(
        keyringAddress: HexString, 
        username: string, 
        password: string
    ) {
        const sailsCallsInstance = this.sailsService.sailsInstance();
        const keyringData = await this.keyringDataByAddress(keyringAddress);
        const hashedPassword = this.encryptString(password);

        let lockedKeyringData;

        try {
            // lockedKeyringData = sailsCallsInstance.formatContractSignlessData(
            lockedKeyringData = sailsCallsInstance.changeModifiedLockedKeyringPairToOriginalState(
                keyringData.keyringData,
                username
            );
            
            sailsCallsInstance.unlockKeyringPair(
                lockedKeyringData,
                hashedPassword
            );
        } catch(e) {
            throw new UnauthorizedException();
        }

        const vouchersId = await sailsCallsInstance.vouchersInContract(keyringAddress);

        return {
            username,
            keyringAddress,
            keyringVoucherId: vouchersId[0],
            lockedKeyringData,
            password: hashedPassword
        }
    }

    async keyringDataByAddress(keyringAddress: HexString) {
        const sailsCallsInstance = this.sailsService.sailsInstance();

        try {
            const response = await sailsCallsInstance.query({
                serviceName: 'Signless',
                methodName: 'KeyringAccountData',
                callArguments: [
                    keyringAddress
                ]
            });

            const voucherId = (await sailsCallsInstance.vouchersInContract(keyringAddress))[0];
            const voucherBalance = await sailsCallsInstance.voucherBalance(voucherId);

            return {
                keyringData: response.signlessAccountData,
                keyringAddress,
                voucherId,
                voucherBalance
            };
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException(JSON.stringify(e));
        }
    }

    encryptString(text: string): string {
        const encryptedText = CryptoJs.SHA256(text).toString();
        return encryptedText;
        // return CryptoJs.SHA256(text).toString(); 
    }

    private async registerKeyringPair(
        signer: IKeyringPair, 
        voucherId: HexString, 
        userCodedName: string, 
        data: IFormatedKeyring
    ) {
        try {
            const response = await this.sailsService.command()({
                signerData: signer,
                voucherId,
                serviceName: 'Signless',
                methodName: 'BindKeyringDataToUserCodedName',
                callArguments: [
                    userCodedName,
                    data
                ]
            }); 
            
            return response;
        } catch(e) {
            throw new InternalServerErrorException(JSON.stringify(e));
        } 
    }
}
