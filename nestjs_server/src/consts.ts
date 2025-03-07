import { HexString } from '@gear-js/api/types';

export const INITIAL_BLOCKS_FOR_VOUCHER: number = 1_200; // one hour
export const INITIAL_VOUCHER_TOKENS: number = 2;
export const NETWORK: string = 'wss://testnet.vara.network'
export const SPONSOR_NAME: string = 'admindavid';
export const SPONSOR_MNEMONIC: string = 'strong orchard plastic arena pyramid lobster lonely rich stomach label clog rubber';
export const CONTRACT_ID: HexString = '0x7134e6bedb37c585a9939cc407bedeb9cf1d048310395bc061eafe920af415ef';
export const IDL: string = `
    type Item = struct {
      name: str,
      description: str,
      image: str,
    };

    type Events = enum {
      ItemAdded: u64,
      ItemRemoved: u64,
      ItemModified: u64,
      ItemIdAlreadyExists: u64,
      ItemIdNotFound: u64,
    };

    type IoState = struct {
      total_items: u128,
      all_items: vec Item,
      item_registry_by_id: vec struct { u64, Item },
      actor_id_registry_by_item: vec struct { u64, actor_id },
      admins: vec actor_id,
    };

    type KeyringData = struct {
      address: str,
      encoded: str,
    };

    type KeyringEvent = enum {
      KeyringAccountSet,
      Error: KeyringError,
    };

    type KeyringError = enum {
      KeyringAddressAlreadyEsists,
      UserAddressAlreadyExists,
      UserCodedNameAlreadyExists,
      UserDoesNotHasKeyringAccount,
      KeyringAccountAlreadyExists,
      SessionHasInvalidCredentials,
      UserAndKeyringAddressAreTheSame,
    };

    type KeyringQueryEvent = enum {
      LastWhoCall: actor_id,
      SignlessAccountAddress: opt actor_id,
      SignlessAccountData: opt KeyringData,
    };

    constructor {
      New : ();
    };

    service Items {
      AddItemService : (item_id: u64, item: Item, actor_id: actor_id) -> Events;
      ModifyItemService : (item_id: u64, new_item: Item) -> Events;
      RemoveItemService : (item_id: u64) -> Events;
      query AllItemsQuery : () -> vec Item;
      query ItemByIdQuery : (item_id: u64) -> opt Item;
      query Query : () -> IoState;
      query TotalItemsQuery : () -> u128;
    };

    service Signless {
      BindKeyringDataToUserAddress : (user_address: actor_id, keyring_data: KeyringData) -> KeyringEvent;
      BindKeyringDataToUserCodedName : (user_coded_name: str, keyring_data: KeyringData) -> KeyringEvent;
      query KeyringAccountData : (keyring_address: actor_id) -> KeyringQueryEvent;
      query KeyringAddressFromUserAddress : (user_address: actor_id) -> KeyringQueryEvent;
      query KeyringAddressFromUserCodedName : (user_coded_name: str) -> KeyringQueryEvent;
    };

`;