import React, { Component } from "react";
import {Link} from "react-router-dom";
let VotingInstance = require('./Voting')
let web3 = require('./Web3');
let project = {}
let state = ''
let ddl = ''
let comments = []
let result = []

class mine_voting_info extends  React.Component {
    constructor() {
        super();
        this.state={
            accounts: '',
            tickets:0,
            content:''
        }
        this.handleChange=this.handleChange.bind(this);
        this.up=this.up.bind(this);
    }
    handleChange(event){
        // 读取输入的值
        const name=event.target.name;
        const value=event.target.value;
        //   更新状态
        this.setState({
            [name]:value
        })
    }
    componentWillMount = async () => {
        project = {} //清空
        comments = []
        project = await VotingInstance.methods.all_Votings(this.props.match.params.id).call()
        project.confirmed_ticket = web3.utils.fromWei(project.confirmed_ticket, 'ether')
        project.target_voting = web3.utils.fromWei(project.target_voting, 'ether');
        project.num_voted = web3.utils.fromWei(project.num_voted, 'ether')
        let proposal_length = project.comment_num
        for(let i = 0; i < proposal_length; i++){
            let announcement = {
                content:'',
                amount:0,
                agreeAmount:0,
                disAmount:0,
                goal:0,
                isAgreed:false,
                p_state:'',
                total:0
            }
            result = []
            result = await VotingInstance.methods.receiveAnnouncement(this.props.match.params.id, i + 1).call()
            announcement.content = result[0]
            announcement.amount = result[1]
            announcement.amount = web3.utils.fromWei(announcement.amount, 'ether')
            console.log(announcement.amount)
            announcement.agreeAmount = result[2]
            announcement.agreeAmount = web3.utils.fromWei(announcement.agreeAmount, 'ether')
            announcement.disAmount = result[3]
            announcement.goal = result[4]
            announcement.goal = web3.utils.fromWei(announcement.goal, 'ether')
            announcement.total = 2 * announcement.goal
            announcement.isAgreed = result[5]
            if(announcement.isAgreed){
                announcement.p_state = "已批准"
            }
            else{
                announcement.p_state = "未批准"
            }
            comments.push(announcement)
        }
        ddl = project.endtime
        let current_time = Date.parse(new Date())
        if(project.isSuccess === true){
            state = "已完成募集"
        }
        else{
            if(ddl - current_time >= 0){
                state = "募集中"
            }
            else{
                state = "项目已过期"
            }
        }
        ddl = (new Date(parseInt(ddl))).toLocaleDateString()
        let accounts = await web3.eth.getAccounts()
        this.setState({
            // manager: manager,
            accounts: accounts
        })
    };
    async up(){

        if (this.state.tickets === 0){
            alert('金额必须大于0!')
        }
        else if((project.num_voted - project.confirmed_ticket) < this.state.tickets){
            alert('您最多可使用' + (project.num_voted - project.confirmed_ticket) + '以太坊')
        }
        else{
            let a = await web3.utils.toWei(this.state.tickets, 'ether')
            console.log(a)
            await VotingInstance.methods.Announcement_Creator(this.props.match.params.id, this.state.content, a).send({
                from: this.state.accounts[0]
            })
            alert('申请成功！')
        }
    }
    render() {
        return (
            <div id="wrapper">

                <ul className="navbar-nav col-xl-1 bg-warning sidebar sidebar-dark accordion" id="accordionSidebar">

                        <a className="sidebar-brand d-flex align-items-center justify-content-center">
                            <div className="sidebar-brand-text mx-2">众筹系统</div>
                        </a>

                        {/*<!-- Divider -->*/}
                        {/*<hr className="sidebar-divider my-0">*/}

                        {/*// <!-- Nav Item - Dashboard -->*/}
                        <li className="nav-item  active">
                            <Link className="nav-link" to='/home'>
                                <span>首页</span></Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to='/all_votings'>
                                <span>所有众筹</span></Link>
                        </li>
                        {/*<!-- Divider -->*/}
                        {/*<hr className="sidebar-divider">*/}

                        <li className="nav-item">
                            <Link className="nav-link" to='/voting_creator'>
                                <span>发起众筹</span></Link>
                        </li>

                        {/*<!-- Divider -->*/}
                        {/*<hr className="sidebar-divider">*/}

                        <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                               aria-expanded="true" aria-controls="collapseTwo">
                                <span>我的众筹</span>
                            </a>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                                 data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">我的众筹:</h6>
                                    <Link className="collapse-item" to="/mine_voting">我发起的众筹</Link>
                                    <Link className="collapse-item" to="/attend_voting">我参与的众筹</Link>
                                </div>
                            </div>
                        </li>

                    </ul>

                <div id="content-wrapper" className="d-flex flex-column">


                    <div id="content">

                        <nav className="navbar navbar-expand navbar-light bg-danger topbar mb-4 static-top shadow">


                                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                                    <i className="fa fa-bars"/>
                                </button>

                                <ul className="navbar-nav">

                                    <li className="nav-item dropdown no-arrow d-sm-none">
                                        <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fas fa-search fa-fw"/>
                                        </a>

                                        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                             aria-labelledby="searchDropdown">
                                            <form className="form-inline mr-auto w-100 navbar-search">
                                                <div className="input-group">
                                                    <input type="text" className="form-control bg-light border-0 small"
                                                           placeholder="Search for..." aria-label="Search"
                                                           aria-describedby="basic-addon2"/>
                                                    <div className="input-group-append">
                                                        <button className="btn btn-primary" type="button">
                                                            <i className="fas fa-search fa-sm"/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </li>


                                    <li className="nav-item dropdown no-arrow">
                                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span className="mr-2 d-none d-lg-inline text-light small">
                                                当前账户地址：{this.state.accounts[0]}</span>
                                        </a>
                                    </li>

                                </ul>

                            </nav>

                        <div class="container-fluid">
                                <div className="card-header py-3">
                                    <h3 className="m-0 font-weight-bold">众筹项目详情 <a href="#" className="btn btn-warning btn-icon-split" style={{float: "right"}}
                                                                                                data-target="#myModal" data-toggle="modal">
                                        <span className="text">发起使用申请</span>
                                    </a></h3>

                                    <div className="modal fade" id="myModal" tabIndex="-1" role="dialog"
                                         aria-labelledby="myModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4 className="modal-title" id="myModalLabel">
                                                        请输入申请金额和用途
                                                    </h4>
                                                    <button type="button" className="close" data-dismiss="modal"
                                                            aria-hidden="true">
                                                        &times;
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <label htmlFor="name">申请金额</label>
                                                    <input type="number" min="0"
                                                           className="form-control form-control-user" name="tickets"
                                                           value={this.state.tickets} onChange={this.handleChange}/>
                                                </div>
                                                <div className="modal-body">
                                                    <label htmlFor="name">使用去向</label>
                                                    <textarea className="form-control" rows="5" name="content"
                                                              value={this.state.overview}
                                                              onChange={this.handleChange}/>
                                                </div>
                                                <div className="modal-footer">
                                                    <a className="btn btn-secondary btn-user btn-block"
                                                       type='submit' data-dismiss="modal">
                                                        关闭
                                                    </a>
                                                    <a className="btn btn-warning btn-user btn-block" type='submit'
                                                       onClick={this.up} data-dismiss="modal">
                                                        确认提交
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                <div className="card-body">
                                    <div className="table-responsive" class="row">
                                        <div className="col-lg-12">
                                                <div className="card-body">
                                                    <h5>众筹项目发起人：<strong>{project.creator_addr}</strong></h5>
                                                </div>
                                        </div>
                                        <div class="col-lg-6">
                                                <div className="card-body">
                                                    <h5>众筹项目名称：<strong>{project.title}</strong><span className="badge badge-warning ml-3">募集截止日期：{ddl}</span></h5>
                                                </div>
                                                <div className="card-body">
                                                    <h5>众筹项目状态：<strong>{state}</strong></h5>
                                                </div>
                                        </div>
                                        <div className="col-lg-6">
                                                <div className="card-body">
                                                    <h5>众筹项目目标筹集资金：<strong>{project.target_voting}eth</strong></h5>
                                                </div>
                                                <div className="card-body">
                                                    <h5>众筹项目可用资金：<strong>{project.num_voted - project.confirmed_ticket}eth</strong></h5>
                                                </div>
                                        </div>
                                        <div className="col-lg-6">
                                                <div className="card-body">
                                                    <h5>众筹项目已使用资金：<strong>{project.confirmed_ticket}eth</strong></h5>
                                                </div>
                                        </div>
                                        <div className="col-lg-6">
                                                <div className="card-body">
                                                    <h5>众筹项目投资人数：<strong>{project.voter_num}</strong></h5>
                                                </div>
                                        </div>
                                        <div className="col-lg-12">
                                                <div className="card-body">
                                                    <h5>众筹项目概述：</h5>
                                                    <p>
                                                        <strong>{project.content}</strong>
                                                    </p>
                                                </div>
                                        </div>

                                    </div>
                                </div>
                        </div>
                                <div className="card-header py-3">
                                    <div className="container-fluid">
                                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                            <h5 className="m-0 font-weight-bold">使用情况详情</h5>
                                        </div>
                                        <div className="col-lg-12">
                                            {
                                                (comments.length===0)
                                                    ?null
                                                    :comments.map((item,index)=>{
                                                        return (
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-xl-6 col-md-6 mb-4">
                                                                                <div className="card-body">
                                                                                    <div className="row no-gutters align-items-center">
                                                                                        <div className="col mr-2">
                                                                                            <div
                                                                                                className="text-xs font-weight-bold text-uppercase mb-1">
                                                                                                申请金额
                                                                                            </div>
                                                                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{item.amount}eth</div>
                                                                                        </div>
                                                                                        <div className="col-auto">
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                        </div>
                                                                        <div className="col-xl-6 col-md-6 mb-4">
                                                                                <div className="card-body">
                                                                                    <div className="row no-gutters align-items-center">
                                                                                        <div className="col mr-2">
                                                                                            <div
                                                                                                className="text-xs font-weight-bold  text-uppercase mb-1">同意百分比
                                                                                            </div>
                                                                                            <div className="row no-gutters align-items-center">
                                                                                                <div className="col-auto">
                                                                                                    <div
                                                                                                        className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{(item.agreeAmount/item.total).toFixed(4)*100}%
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="col">
                                                                                                    <div className="progress progress-sm mr-2">
                                                                                                        <div className="progress-bar bg-info" role="progressbar"
                                                                                                             style={{width: (item.agreeAmount/item.total)*100 + '%'}} aria-valuenow="50"
                                                                                                             aria-valuemin="0"
                                                                                                             aria-valuemax="100"/>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-auto">
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                        </div>
                                                                        <div className="col-xl-12 col-md-6 mb-4">
                                                                                <div className="card-body">
                                                                                    <div className="row no-gutters align-items-center">
                                                                                        <div className="col mr-2">
                                                                                            <div
                                                                                                className="text-xs font-weight-bold text-uppercase mb-1">
                                                                                                使用说明
                                                                                            </div>
                                                                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{item.content}</div>
                                                                                        </div>
                                                                                        <div className="col-auto">
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                    </div>
                                                                </div>
                                                        )
                                                    },this)
                                            }
                                        </div>

                                    </div>
                                    <div>
                    </div>
                </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default mine_voting_info;