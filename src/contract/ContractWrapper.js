const {ethers} = require('ethers');
const abi = require('./CounterABI.json');

export default class ContractWrapper {

    constructor(signer) {
        this.contract = new ethers.Contract('0x8d7A5Ba28F17c576C6cD4F87926A82B7a98967F0', abi, signer);
    }

    async retrieveCountValue() {
        try {
            return (await this.contract.count()).toNumber();
        } catch (error) {
            console.error(error);
            return -1;
        }
    }

    async inclement(onSuccess, onError) {
        try {
            const trxResponse = await this.contract.add(1);
            onSuccess('Transaction send!');
            this.contract.provider.once(trxResponse.hash, () => {
                onSuccess('Transaction minted!');
            })
        } catch(error) {
            onError(error);
        }
    }

    async declement(onSuccess, onError) {
        try {
            const trxResponse = await this.contract.substract(1);
            onSuccess('Transaction send!');
            this.contract.provider.once(trxResponse.hash, () => {
                onSuccess('Transaction minted!');
            })
        } catch(error) {
            onError(error);
        }
    }

    getAddress() {
        return this.contract.address;
    }
}