const {ethers} = require('ethers');
const abi = require('./CounterABI.json');

export default class CounterContract {

    constructor(signer) {
        this.counterContract = new ethers.Contract('0x8d7A5Ba28F17c576C6cD4F87926A82B7a98967F0', abi, signer);
    }

    async retrieveCountValue() {
        try {
            return (await this.counterContract.count()).toNumber();
        } catch (error) {
            console.error(error);
            return -1;
        }
    }

    async inclement(onSuccess, onError) {
        try {
            const trxResponse = await this.counterContract.add(1);
            onSuccess('Transaction send!');
            this.counterContract.provider.once(trxResponse.hash, () => {
                onSuccess('Transaction minted!');
            })
        } catch(error) {
            onError(error);
        }
    }

    async declement(onSuccess, onError) {
        try {
            const trxResponse = await this.counterContract.substract(1);
            onSuccess('Transaction send!');
            this.counterContract.provider.once(trxResponse.hash, () => {
                onSuccess('Transaction minted!');
            })
        } catch(error) {
            onError(error);
        }
    }

    getAddress() {
        return this.counterContract.address;
    }
}