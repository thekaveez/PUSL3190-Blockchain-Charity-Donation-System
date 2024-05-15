// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract SchoolDonation {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
        bool isActive;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(address => bool) public whitelist;
    address public admin;
    address[] public whitelistedAddress;
    uint256 public numberOfCampaigns = 0;
    uint256 public numOfWhitelisters = 0;

    event CampaignCreated(
        address owner,
        string title,
        string description,
        uint256 target,
        uint256 deadline,
        string image
    );

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyWhitelisted() {
        require(whitelist[msg.sender], "Not whitelisted");
        _;
    }

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public onlyWhitelisted returns (uint256) {

        Campaign storage campaign = campaigns[numberOfCampaigns];

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.isActive = true;

        require(campaign.deadline > block.timestamp, "Deadline should be in the future");

        numberOfCampaigns++;

        emit CampaignCreated(_owner, _title, _description, _target, _deadline, _image);

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        require(campaigns[_id].isActive, "Campaign is not active");
        Campaign storage campaign = campaigns[_id];
        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);

        (bool sent,) = payable(campaign.owner).call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        campaign.amountCollected += msg.value;
    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() view public returns (Campaign[] memory){
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        for (uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage campaign = campaigns[i];
            allCampaigns[i] = campaign;
        }
        return allCampaigns;
    }

    function deleteCampaign(uint256 _id) public {
        require(msg.sender == campaigns[_id].owner || msg.sender == admin, "Only owner or admin can delete the campaign");
        require(campaigns[_id].isActive, "Campaign is already inactive");

        campaigns[_id].isActive = false;
        numberOfCampaigns--;
    }


   function setWhitelistAddress(address _address, bool isWhitelisted) external onlyAdmin {
    whitelist[_address] = isWhitelisted;
        whitelistedAddress.push(_address);
        numOfWhitelisters++;

}

   function deleteWhitelistAddress(address _address) external onlyAdmin {
     require(whitelist[_address], "Address is not whitelisted");
    whitelist[_address] = false;
        whitelistedAddress.pop();
        numOfWhitelisters--;

}



    function setMultipleWhitelistAddresses(address[] memory _addresses, bool isWhitelisted) public onlyAdmin {
        for (uint256 i = 0; i < _addresses.length; i++) {
            whitelist[_addresses[i]] = isWhitelisted;
        }
    }

    function changeAdmin(address newAdmin) public onlyAdmin {
        admin = newAdmin;
    }
}