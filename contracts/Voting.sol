pragma solidity >=0.4.0;

contract Voting{
    struct Voting{
        address payable initiator; //众筹项目发起者
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
        mapping(uint => Comment) comments;//申请使用资金的记录
    }

    // 投资者信息
    struct Voter{
        address payable add; //投资者地址
        uint ticket; //投资者的投资金额
    }

    uint public allFundingsLength;//众筹项目的总数量 ??????????
    mapping(uint => Voting) public allFundings;//所有众筹项目的map ??????????


    //申请使用资金的记录
    struct Comment{
        string content;//申请说明
        uint amount;//申请金额
        uint agreeAmount;//持同意态度的投资者的金额之和
        uint disAmount;//持反对态度的投资者的金额之和
        uint goal;//可以转账的最低金额，数值上等于amount的一般
        mapping(uint => uint) states;//该记录的状态
        bool isAgreed;//是否通过
    }
    //投资项目的函数
    function contribute(uint _fundId) public payable {
        require(msg.value>0);
        require(block.timestamp<=allFundings[_fundId].deadline);
        Voting storage funding = allFundings[_fundId];
        uint funderNum = funding.voter_num + 1;
        funding.voter_num += 1;
        Voter storage funder = funding.voters[funderNum];
        funder.add = msg.sender;
        funder.ticket = msg.value;
        funding.num_voted += msg.value;
        if(funding.num_voted >= funding.target_voting)funding.isSuccess=true;
    }
    //创建众筹项目的函数
    function createFunding(address payable _initiator, string memory _title, string memory _content, uint _goalMoney, uint _remainingtime) public returns(uint) {
        uint num = allFundingsLength;
        allFundingsLength+=1;
        Voting storage funding = allFundings[num];
        funding.initiator = _initiator;
        funding.title = _title;
        funding.content = _content;
        funding.target_voting = _goalMoney;
        funding.num_voted = 0;
        funding.deadline = _remainingtime + block.timestamp;
        return num;
    }
    

    //创建申请资金的记录
    function createProposal(uint _fundId, string memory _content, uint _amount) public {
        Voting storage funding = allFundings[_fundId];
        require(funding.initiator == msg.sender);
        uint proNum = funding.comment_num + 1;
        funding.comment_num+=1;
        Comment storage proposal = funding.comments[proNum];
        proposal.content = _content;
        proposal.amount = _amount;
        proposal.goal = funding.num_voted / 2;
    }
    //审批申请的函数
    function agreeProposal(uint _fundId, uint _proposalId, bool _isAgree) public funderOfFunding(_fundId){
        Voting storage funding = allFundings[_fundId];
        require(_proposalId>=1 && _fundId<=funding.comment_num);
        Comment storage proposal = funding.comments[_proposalId];
        for(uint i = 1; i<=funding.voter_num;i++){
            Voter memory funder = funding.voters[i];
            if(funder.add==msg.sender){
                if(_isAgree){
                    proposal.states[i]=1;
                    proposal.agreeAmount += funder.ticket;
                }
                else{
                    proposal.states[i]=2;
                    proposal.disAmount += funder.ticket;
                }
            }
        }
        if(proposal.agreeAmount >= proposal.goal){
            proposal.isAgreed = true;
            funding.initiator.transfer(proposal.amount);
            funding.usedMoney += proposal.amount;
        }
        else if(proposal.disAmount >=proposal.goal){
            proposal.isAgreed = false;
        }
    }
    //获取的申请记录
    function getProposal(uint _fundId, uint _proposalId) public view returns(string memory, uint, uint, uint, uint, bool) {
        require(_fundId>=0 && _fundId<=allFundingsLength);
        Voting storage funding = allFundings[_fundId];
        require(_proposalId>=1 && _fundId<=funding.comment_num);
        Comment storage proposal = funding.comments[_proposalId];
        return (proposal.content, proposal.amount, proposal.agreeAmount, proposal.disAmount, proposal.goal, proposal.isAgreed);
    }
    //获取申请记录的数量
    function getProposalsLength(uint _fundId) public view returns(uint){
        return allFundings[_fundId].comment_num;
    }
    //获取合约地址的剩余资金
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    //make sure the funder is in this funding
    modifier funderOfFunding(uint _fundId){
        require(_fundId>=0 && _fundId<=allFundingsLength);
        Voting storage funding = allFundings[_fundId];
        bool isIn = false;
        for(uint i = 1; i<=funding.voter_num;i++){
            Voter memory funder = funding.voters[i];
            if(funder.add==msg.sender)
            isIn = true;
        }
        require(isIn == true);
        _;
    }
    
    function getMyFundings(uint _fundId) public view returns(uint){
        uint money=0;
        Voting storage funding = allFundings[_fundId];
        for(uint j=1;j<=funding.voter_num;j++){
            Voter memory funder = funding.voters[j];
            if(funder.add==msg.sender)
            money+=funder.ticket;
        }
        return money;
    }
    
    function getMyInitFundings(uint _fundId) public view returns(bool){
        return (allFundings[_fundId].initiator == msg.sender ? true:false);
    }
}
