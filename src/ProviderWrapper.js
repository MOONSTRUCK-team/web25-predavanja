import { ethers } from "ethers";

export default class ProviderWrapper {

    constructor(onAccountsChangedCb) {
        this.onAccountsChangedCb = onAccountsChangedCb;

        if(window.ethereum && window.ethereum.isMetaMask) {
            this.provider = new ethers.providers.Web3Provider(window.ethereum);
            window.ethereum.on('chainChanged', this.onChainChanged);
            window.ethereum.on('accountsChanged', this.onAccountsChanged.bind(this));
        } else {
            console.error('Something went wrong. Please check if Metamask is installed!');
        }
    }

    connectToMetamask(onSuccess, onError) {
        this.provider.send('eth_requestAccounts', [])
        .then(() => {
            onSuccess();
        }).catch((error) => {
            console.error(`Error: ${error}`);
            onError();
        });
    }

    getSigner() {
        return this.provider.getSigner();
    }

    async isConnected() {
        let connected = false;

        try {
            const signer = this.provider.getSigner();
            if (signer && (await signer.getAddress())) {
                connected = true;
            }
        } catch(error) {
            console.error(error);
        }

        return connected;
    }

    onChainChanged() {
        window.location.reload();
    }

    onAccountsChanged() {
        this.onAccountsChangedCb();
    }
}