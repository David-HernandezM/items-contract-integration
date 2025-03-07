// state.rs
// necessary crates
use sails_rs::{
    prelude::*,
    collections::HashMap
};

pub static mut STATE: Option<State> = None;

pub type ItemId = u64;

#[derive(Clone, Default)]
pub struct State {
    pub total_items: u128,
    pub all_items: Vec<Item>,                // Keep an up-to-date list of items
    pub item_registry_by_id: HashMap<ItemId, Item>,
    pub actor_id_registry_by_item: HashMap<ItemId, ActorId>,
    pub admins: Vec<ActorId>,
}

#[derive(Encode, Decode, TypeInfo, Clone, PartialEq, Eq)]
#[codec(crate = sails_rs::scale_codec)]
#[scale_info(crate = sails_rs::scale_info)]
pub struct Item {
    pub name: String,
    pub description: String,
    pub image:String
}

impl State {
    pub fn new() -> Self {
        Self { ..Default::default() }
    }

    pub fn init_state() {
        unsafe {
            STATE = Some(Self::new());
        };
    }

    pub fn state_mut() -> &'static mut State {
        let state = unsafe { STATE.as_mut() };
        debug_assert!(state.is_some(), "The state is not initialized");
        unsafe { state.unwrap_unchecked() }
    }

    pub fn state_ref() -> &'static State {
        let state = unsafe { STATE.as_ref() };
        debug_assert!(state.is_some(), "The state is not initialized");
        unsafe { state.unwrap_unchecked() }
    }

    // --------------------------------------------------
    // Corrected: Service to add an item
    // --------------------------------------------------
    pub fn add_item(&mut self, item_id: ItemId, item: Item, actor_id: ActorId) {
        // Insert into HashMap
        self.item_registry_by_id.insert(item_id, item.clone());
        self.actor_id_registry_by_item.insert(item_id, actor_id);

        // Keep track in the all_items Vec if desired
        self.all_items.push(item);

        self.total_items += 1;
    }

    // --------------------------------------------------
    // Corrected: Service to remove an item by ID
    // --------------------------------------------------
    pub fn remove_item(&mut self, item_id: &ItemId) {
        // Attempt to remove from the item_registry_by_id
        if let Some(removed_item) = self.item_registry_by_id.remove(item_id) {
            // Also remove from actor_id_registry_by_item
            self.actor_id_registry_by_item.remove(item_id);

            // Remove matching item from all_items
            self.all_items.retain(|item| item != &removed_item);

            self.total_items -= 1;
        }
    }

    // --------------------------------------------------
    // Corrected: Service to modify an item by ID
    // --------------------------------------------------
    pub fn modify_item(&mut self, item_id: &ItemId, new_item: Item) {
        // Find the old item in the HashMap
        if let Some(old_item) = self.item_registry_by_id.get_mut(item_id) {
            // Update the HashMap
            let previous_item = old_item.clone();
            *old_item = new_item.clone();

            // Optionally keep all_items in sync
            if let Some(pos) = self.all_items.iter().position(|i| i == &previous_item) {
                self.all_items[pos] = new_item;
            }
        }
    }

    // --------------------------------------------------
    // Admin services
    // --------------------------------------------------
    pub fn add_admin(&mut self, admin: ActorId) {
        self.admins.push(admin);
    }

    pub fn remove_admin(&mut self, admin: &ActorId) {
        self.admins.retain(|a| a != admin);
    }
}

// A struct to send state info to the user
#[derive(Encode, Decode, TypeInfo)]
#[codec(crate = sails_rs::scale_codec)]
#[scale_info(crate = sails_rs::scale_info)]
pub struct IoState {
    pub total_items: u128,
    pub all_items: Vec<Item>,
    pub item_registry_by_id: Vec<(ItemId, Item)>,
    pub actor_id_registry_by_item: Vec<(ItemId, ActorId)>,
    pub admins: Vec<ActorId>,
}

impl From<State> for IoState {
    fn from(value: State) -> Self {
        let State {
            total_items,
            all_items,
            item_registry_by_id,
            actor_id_registry_by_item,
            admins,
        } = value;

        let item_registry_by_id = item_registry_by_id
            .iter()
            .map(|(k, v)| (*k, v.clone()))
            .collect();

        let actor_id_registry_by_item = actor_id_registry_by_item
            .iter()
            .map(|(k, v)| (*k, v.clone()))
            .collect();

        Self {
            total_items,
            all_items,
            item_registry_by_id,
            actor_id_registry_by_item,
            admins,
        }
    }
}
