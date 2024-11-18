// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChiefValidation{
    string public chiefAadhaar="369852014724";
    string public chiefID="VDWA1597RG";
    address public chief;

    // modifiers
    modifier ifChief(){
        require(chief!=address(0),"Set Chief First");
        _;
    }
    modifier aadhaarValidation(string memory aadhaar){
        require(keccak256(bytes(aadhaar))==keccak256(bytes(chiefAadhaar)),"Enter valid Aadhaar");
        _;
    }
    modifier idValidation(string memory id){
        require(keccak256(bytes(id))==keccak256(bytes(chiefID)),"Enter valid Id");
        _;
    }
    modifier checkChief(){
        require(msg.sender==chief,"You have no rights to change these details");
        _;
    }

    function setChief(string memory aadhaar, string memory id) public aadhaarValidation(aadhaar) idValidation(id) {
        require(chief==address(0),"Chief already set with different address");
        chief=msg.sender;
    }

    function updateDetails(string memory aadhaar, string memory id) public ifChief checkChief {
        chiefAadhaar=aadhaar;
        chiefID=id;
        chief=address(0);
    }

    function resetChief() public{
        chief = address(0);
    }
}