#![no_std]

// necesary crates
use sails_rs::prelude::*;
use keyring_service::services::keyring_service::KeyringService;

// import our modules 
pub mod states;
pub mod services;

// Import service to be used for the program
use services::service::Service;

pub struct Program;

#[program]
impl Program {
    // Application constructor (it is an associated function)
    // It can be called once per application lifetime.
    pub fn new() -> Self {
        // Init the state
        Service::seed();
        KeyringService::seed();

        Self
    }

    // SignLess Service
    #[export(route = "Signless")]
    pub fn keyring_svc(&self) -> KeyringService {
        KeyringService::new()
    }

    
    // Items Service
    #[export(route = "Items")]
    pub fn service_svc(&self) -> Service {
        Service::new()
    }
}