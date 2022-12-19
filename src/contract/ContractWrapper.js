const {ethers} = require('ethers');
const abi = require('./AkademijaNFT.json');

// TODO Look for best way to retrieve all tokenIDs for one user
export default class ContractWrapper {

    constructor(signer) {
        this.contract = new ethers.Contract('0xd9145CCE52D386f254917e481eB44e9943F39138', abi, signer);
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

    // cid - Content identifier of file uploaded to IPFS
    // onSuccess(message, isMinted)
    // onError(message)
    async mint(cid, onSuccess, onError) {
        try {
            const trxResponse = await this.contract.mint(cid);
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