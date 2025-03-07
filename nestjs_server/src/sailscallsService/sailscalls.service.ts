import { 
    CONTRACT_ID, 
    IDL, 
    NETWORK, 
    SPONSOR_MNEMONIC, 
    SPONSOR_NAME 
} from "../consts.js";
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Subject } from "rxjs";
import { SailsCalls } from 'sailscalls';


@Injectable()
export class SailscallsService implements OnModuleInit, OnModuleDestroy {
    private shutdownListener: Subject<void> = new Subject();
    private sailsCalls: SailsCalls;

    sailsInstance() {
        return this.sailsCalls;
    }

    command() {
        return this.sailsCalls.command;
    }

    query() {
        return this.sailsCalls.query;
    }

    async onModuleInit() {
        this.sailsCalls = await SailsCalls.new({
            network: NETWORK,
            voucherSignerData: {
                sponsorMnemonic: SPONSOR_MNEMONIC,
                sponsorName: SPONSOR_NAME
            },
            newContractsData: [
                {
                    contractName: 'traffic_light',
                    address: CONTRACT_ID,
                    idl: IDL
                }
            ]
        });

        console.log('Sailscalls service has been initialized.');
        
    }

    async onModuleDestroy() {
        await this.sailsCalls.disconnectGearApi();
        console.log('Sailscalls service has been destroyed.');
    }
}
