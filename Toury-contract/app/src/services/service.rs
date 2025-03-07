// service.rs
use sails_rs::{
    prelude::*,
    gstd::msg,
};

// import the state
use crate::states::*;
use crate::services::service::state::*; 

#[derive(Default)]
pub struct Service;

impl Service {
    // Function to init the service state (call only once)
    pub fn seed() {
        State::init_state();
    }
}

#[service]
impl Service {
    // Service constructor
    pub fn new() -> Self {
        Self
    }

    // -------------------------------------------------------------------
    //  service to add an item
    // -------------------------------------------------------------------
    pub fn add_item_service(&mut self, item_id: ItemId, item: Item, actor_id: ActorId) -> Events {
        let state = State::state_mut();

        // Validation: check for existing item ID in the HashMap
        if state.item_registry_by_id.contains_key(&item_id) {
            return Events::ItemIdAlreadyExists(item_id);
        }

        // Add item logic
        state.add_item(item_id, item, actor_id);

        // Return successful event
        Events::ItemAdded(item_id)
    }

    // -------------------------------------------------------------------
    // service to remove an item
    // -------------------------------------------------------------------
    pub fn remove_item_service(&mut self, item_id: ItemId) -> Events {
        let state = State::state_mut();

        // Check if item exists
        if !state.item_registry_by_id.contains_key(&item_id) {
            return Events::ItemIdNotFound(item_id);
        }

        // Remove item logic
        state.remove_item(&item_id);

        // Return successful event
        Events::ItemRemoved(item_id)
    }

    // -------------------------------------------------------------------
    // Service to modify an item
    // -------------------------------------------------------------------
    pub fn modify_item_service(&mut self, item_id: ItemId, new_item: Item) -> Events {
        let state = State::state_mut();

        // Check if item exists
        if !state.item_registry_by_id.contains_key(&item_id) {
            return Events::ItemIdNotFound(item_id);
        }

        // Modify item logic
        state.modify_item(&item_id, new_item);

        // Return successful event
        Events::ItemModified(item_id)
    }

    // -------------------------------------------------------------------
    // Queries
    // -------------------------------------------------------------------
    // Query to get total number of items
    pub fn total_items_query(&self) -> u128 {
        State::state_ref().total_items
    }

    // Query to get all items
    pub fn all_items_query(&self) -> Vec<Item> {
        State::state_ref().all_items.clone()
    }

    // Query to get item by ID
    pub fn item_by_id_query(&self, item_id: ItemId) -> Option<Item> {
        State::state_ref().item_registry_by_id.get(&item_id).cloned()
    }

    // Query returning full state info as IoState
    pub fn query(&self) -> IoState {
        State::state_ref().to_owned().into()
    }
}

// Events emitted by the contract
#[derive(Encode, Decode, TypeInfo)]
#[codec(crate = sails_rs::scale_codec)]
#[scale_info(crate = sails_rs::scale_info)]
pub enum Events {
    ItemAdded(ItemId),
    ItemRemoved(ItemId),
    ItemModified(ItemId),
    ItemIdAlreadyExists(ItemId),
    ItemIdNotFound(ItemId),
}
