pragma solidity >=0.4.0;

contract Voting{
    struct Voting{
        address payable creator_addr; //众筹项目发起者
        string title;//标题
        string content;//内容
        uint target_voting;//目标金额
        uint num_voted;//已筹集金额
        uint usedMoney;//已使用金额
        uint deadline;//众筹项目截止日期
        bool isSuccess;//是否筹集成功
        uint voter_num;//投资人数量
        uint comment_num;//申请使用资金的次数
        mapping(uint => Voter) voters;//投资者
        mapping(uint => Announcement) comments;//申请使用资金的记录
    }

    // 投资者信息
    struct Voter{
        address payable add; //投资者地址
        uint ticket; //投资者的投资金额
    }

    uint public all_votings_num;//众筹项目的总数量 ??????????
    mapping(uint => Voting) public all_Votings;//所有众筹项目的map ??????????


    
    //投资项目的函数
    function Vote_sender(uint _votingId) public payable {
        require(msg.value>0);
        require(block.timestamp<=all_Votings[_votingId].deadline);
        Voting storage voting = all_Votings[_votingId];
        uint funderNum = voting.voter_num + 1;
        voting.voter_num += 1;
        Voter storage voter = voting.voters[funderNum];
        voter.add = msg.sender;
        voter.ticket = msg.value;
        voting.num_voted += msg.value;
        if(voting.num_voted >= voting.target_voting)voting.isSuccess=true;
    }
    //创建众筹项目的函数
    function Voting_constructor(address payable _initiator, string memory _title, string memory _content, uint _goalMoney, uint _remainingtime) public returns(uint) {
        uint num = all_votings_num;
        all_votings_num+=1;
        Voting storage voting = all_Votings[num];
        voting.creator_addr = _initiator;
        voting.title = _title;
        voting.content = _content;
        voting.target_voting = _goalMoney;
        voting.num_voted = 0;
        voting.deadline = _remainingtime + block.timestamp;
        return num;
    }
    
    //申请使用资金的记录
    struct Announcement{
        string content;//申请说明
        uint amount;//申请金额
        uint agreeAmount;//持同意态度的投资者的金额之和
        uint disAmount;//持反对态度的投资者的金额之和
        uint goal;//可以转账的最低金额，数值上等于amount的一般
        mapping(uint => uint) states;//该记录的状态
        bool isAgreed;//是否通过
    }
    //创建申请资金的记录
    function Announcement_Creator(uint _votingId, string memory _content, uint _amount) public {
        Voting storage voting = all_Votings[_votingId];
        require(voting.creator_addr == msg.sender);
        uint counter = voting.comment_num + 1;
        voting.comment_num+=1;
        Announcement storage announcement = voting.comments[counter];
        announcement.content = _content;
        announcement.amount = _amount;
        announcement.goal = voting.num_voted / 2;
    }
    //审批申请的函数
    function confirmAnnouncement(uint _votingId, uint _announcementId, bool _isAgree) public isVoterInVoting(_votingId){
        Voting storage voting = all_Votings[_votingId];
        require(_announcementId>=1 && _votingId<=voting.comment_num);
        Announcement storage announcement = voting.comments[_announcementId];
        for(uint i = 1; i<=voting.voter_num;i++){
            Voter memory voter = voting.voters[i];
            if(voter.add==msg.sender){
                if(_isAgree){
                    announcement.states[i]=1;
                    announcement.agreeAmount += voter.ticket;
                }
                else{
                    announcement.states[i]=2;
                    announcement.disAmount += voter.ticket;
                }
            }
        }
        if(announcement.agreeAmount >= announcement.goal){
            announcement.isAgreed = true;
            voting.creator_addr.transfer(announcement.amount);
            voting.usedMoney += announcement.amount;
        }
        else if(announcement.disAmount >=announcement.goal){
            announcement.isAgreed = false;
        }
    }
    //获取的申请记录
    function receiveAnnouncement(uint _votingId, uint _announcementId) public view returns(string memory, uint, uint, uint, uint, bool) {
        require(_votingId>=0 && _votingId<=all_votings_num);
        Voting storage voting = all_Votings[_votingId];
        require(_announcementId>=1 && _votingId<=voting.comment_num);
        Announcement storage announcement = voting.comments[_announcementId];
        return (announcement.content, announcement.amount, announcement.agreeAmount, announcement.disAmount, announcement.goal, announcement.isAgreed);
    }
    //获取申请记录的数量
    function num_of_Announcements(uint _votingId) public view returns(uint){
        return all_Votings[_votingId].comment_num;
    }
    //获取合约地址的剩余资金
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    //make sure the voter is in this voting
    modifier isVoterInVoting(uint _votingId){
        require(_votingId>=0 && _votingId<=all_votings_num);
        Voting storage voting = all_Votings[_votingId];
        bool check = false;
        for(uint i = 1; i<=voting.voter_num;i++){
            Voter memory voter = voting.voters[i];
            if(voter.add==msg.sender)
            check = true;
        }
        require(check == true);
        _;
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
