// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0;

contract Voting{
    struct Voting{
        address payable creator_addr;
        string title;
        string content;
        uint target_voting;
        uint num_voted;
        uint endtime;
        bool isSuccess;
        uint voter_num;
        mapping(uint => Voter) voters;
    }


    struct Voter{
        address payable add;
        uint ticket;
    }

    uint public all_votings_num;
    mapping(uint => Voting) public all_Votings;

    function Vote_sender(uint _votingId) public payable {
        require(msg.value>0);
        require(block.timestamp<=all_Votings[_votingId].endtime);
        Voting storage voting = all_Votings[_votingId];
        uint voternum = voting.voter_num + 1;
        voting.voter_num = voting.voter_num + 1;
        Voter storage voter = voting.voters[voternum];
        voter.add = msg.sender;
        voter.ticket = msg.value;
        voting.num_voted = voting.num_voted + msg.value;
        if(voting.num_voted >= voting.target_voting)voting.isSuccess=true;
    }

    function Voting_constructor(address payable _initiator, string memory _title, string memory _content, uint _goalMoney, uint _endtime) public returns(uint) {
        uint num = all_votings_num;
        all_votings_num+=1;
        Voting storage voting = all_Votings[num];
        voting.creator_addr = _initiator;
        voting.title = _title;
        voting.content = _content;
        voting.target_voting = _goalMoney;
        voting.num_voted = 0;
        voting.endtime = _endtime;
        return num;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function MyVotings(uint _votingId) public view returns(uint){
        uint tickets=0;
        Voting storage voting = all_Votings[_votingId];
        for(uint j=1;j<=voting.voter_num;j++){
            Voter memory voter = voting.voters[j];
            if(voter.add==msg.sender)
            tickets+=voter.ticket;
        }
        return tickets;
    }
    function MyCreatedVotings(uint _votingId) public view returns(bool){
        bool check = true;
        if(all_Votings[_votingId].creator_addr != msg.sender){
            check = false;
        }
        return check;
    }
}