// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SafeVote {
    // Variable Declaration
    struct Voter{
        bool isRegistered;
        bool hasVoted;
        string district;
        string state;
    }
    struct Candidate{
        uint id;
        string name;
        uint age;
        string district;
        string state;
        uint voteCount;
    }
    Voter[] voterList;
    Candidate[] public candidateList;
    address public chief;
    bool candidateRegistrationOpen;
    bool voterRegistrationOpen;
    bool votingOpen;
    bool resultViewOpen;
    mapping (string => address) voterAddressMap;
    mapping (address => Voter) voterDetailsMap;
    mapping (uint => bool) candidateRegister;

    // Modifiers
    modifier onlyElectionChief(){
        require((msg.sender==chief),"Only election chief can perform this action");
        _;
    }
    modifier duringCandidateRegistration(){
        require(candidateRegistrationOpen,"Candidate Registration Closed");
        _;
    }
    modifier duringVoterRegistration(){
        require(voterRegistrationOpen,"Voter Registration Closed");
        _;
    }
    modifier duringVoting(){
        require(votingOpen,"Voting Closed");
        _;
    }
    modifier duringResultView(){
        require(resultViewOpen,"Result Viewing Closed");
        _;
    }
    modifier ifChief(){
        require(chief!=address(0),"Set Chief First");
        _;
    }

    // Functions
    function setChief() public {
        chief=msg.sender;
    }
    function resetChief() public {
        chief = address(0);
    }
    function setCandidateRegistration() public ifChief onlyElectionChief{
        candidateRegistrationOpen=true;
        voterRegistrationOpen=false;
        votingOpen=false;
        resultViewOpen=false;
    }
    function setVoterRegistration() public ifChief onlyElectionChief{
        candidateRegistrationOpen=false;
        voterRegistrationOpen=true;
        votingOpen=false;
        resultViewOpen=false;
    }
    function setVoting() public ifChief onlyElectionChief{
        candidateRegistrationOpen=false;
        voterRegistrationOpen=false;
        votingOpen=true;
        resultViewOpen=false;
    }
    function setResultView() public ifChief onlyElectionChief{
        candidateRegistrationOpen=false;
        voterRegistrationOpen=false;
        votingOpen=false;
        resultViewOpen=true;
    }
    function registerCandidate(uint id,string memory name, uint age, string memory district, string memory state) public ifChief onlyElectionChief duringCandidateRegistration{
        require(!candidateRegister[id],"Candidate ID Already Registered");
        candidateList.push(Candidate(id,name,age,district,state,0));
        candidateRegister[id]=true;
    }
    function registerVoter(string memory hash, string memory district, string memory state) public duringVoterRegistration{
        require(voterAddressMap[hash]==address(0),"Voter Already Registered with these Details");
        require(!voterDetailsMap[msg.sender].isRegistered,"Voter Already Registered with this Address");
        voterAddressMap[hash]=msg.sender;
        voterDetailsMap[msg.sender]=Voter(true,false,district,state);
    }
    function toString(uint num) internal pure returns (string memory){
        if(num==0){
            return '0';
        }
        uint256 temp = num;
        uint256 digits;
        while(temp!=0){
            digits++;
            temp/=10;
        }
        bytes memory buffer = new bytes(digits);
        while(num!=0){
            digits--;
            buffer[digits]=bytes1(uint8(48+(num%10)));
            num/=10;
        }
        return string(buffer);
    }
    function vote(uint id) public duringVoting{
        Voter memory voterDetails=voterDetailsMap[msg.sender];
        require(voterDetails.isRegistered, "Voter not Registered");
        require(!voterDetails.hasVoted,"Voter already Voted");
        candidateList[id].voteCount+=1;
        voterDetails.hasVoted=true;
    }
    function resultView() public view returns (Candidate[] memory){
        return candidateList;
    }
}