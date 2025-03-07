import axios from "axios";

export async function fetchUserAddress() {
    try {
        console.log('llamada:');
        const response = await axios.get('http://localhost:3000/keyring/keyringAddress');
        console.log('Res: ');
        console.log(response.data);
        return response.data;
    } catch (e) {
        return false;
    }
}

export async function fetchContractState() {
    try {
        const response = await axios.get('http://localhost:3000/trafficlight/state');
        console.log('response from server:');
        console.log(response);
        return response;
    } catch (e) {
        return { error: 'Error while reading state' };
    }
}