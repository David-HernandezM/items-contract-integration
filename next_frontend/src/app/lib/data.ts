import axios from "axios";

export async function fetchUserAddress() {
    try {
        const response = await axios.get('http://localhost:3000/keyring/keyringAddress');
        return response.data;
    } catch (e) {
        return false;
    }
}

export async function fetchContractState() {
    try {
        const response = await axios.get('http://localhost:3000/trafficlight/state');
        return response;
    } catch (e) {
        return { error: 'Error while reading state' };
    }
}