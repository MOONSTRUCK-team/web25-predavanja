const {ethers} = require('ethers');
const abi = require('./AkademijaNFT.json');

export default class ContractWrapper {

    constructor(provider) {
        this.contract = new ethers.Contract(
            '0x400A128e52aa79a67F7e8b39116Dfd292Ca059A9',
            abi,
            provider
        );
    }

    getAddress() {
        return this.contract.address;
    }

    async getTokenCount() {
        return (await this.contract.tokenCount()).toNumber();
    }

    async getTokenOwner(tokenId) {
        return (await this.contract.ownerOf(tokenId));
    }

    async getTokenURI(tokenId) {
        return (await this.contract.tokenURI(tokenId));
    }

    async getTokenDetails(tokenId) {
        return (await this.contract.getTokenDetails(tokenId));
    }

    // signer - Ethers signer for transaction
    // cid - Content identifier of file uploaded to IPFS
    // onSuccess(message, isMinted)
    // onError(message)
    async mint(signer, cid, onSuccess, onError) {
        try {
            const trxResponse = await this.contract.connect(signer).mint(cid);
            onSuccess('Mint transaction send!', false);
            this.contract.provider.once(trxResponse.hash, () => {
                this.getTokenCount().then((tokenId) => {
                    onSuccess(`Token with ID ${tokenId} minted!`, true);
                });
            })
        } catch(error) {
            onError(error.message);
        }
    }
}