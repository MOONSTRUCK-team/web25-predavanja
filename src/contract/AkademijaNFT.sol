pragma solidity 0.8.17;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract AkademijaNFT is ERC721URIStorage {
    uint256 public constant MAX_MINT_COUNT = 2;

    uint256 public tokenCount;
    mapping (address => uint256) public mintCount;

    error maxMintCountReached();

    constructor() ERC721("AkademijaNFT", "ANFT") {}

    /// @param cid Content identifier of metadata file uploaded to IPFS
    function mint(string calldata cid) external {
        if (mintCount[msg.sender] >= MAX_MINT_COUNT) 
            revert maxMintCountReached();

        uint256 tokenId = ++tokenCount;
        mintCount[msg.sender]++;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, cid);
    }

    function getTokenDetails(uint256 tokenId) external view returns (address owner, string memory uri) {
        _requireMinted(tokenId);
        return (ownerOf(tokenId), tokenURI(tokenId));
    }

    function _baseURI() internal view virtual override returns (string memory) {
        // Link to dedicated gateway for web2.5 course
        return "https://web25dapp.myfilebase.com/ipfs/";
    }
}