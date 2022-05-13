import React, { Component } from "react";
import {Link} from "react-router-dom";
let VotingInstance = require('./Voting')
let web3 = require('./Web3');
let project = {}
let state = ''
let ddl = ''
let comments = []
let result = []
class attend_voting_info extends  React.Component {
    constructor() {
        super();
        this.state={
            accounts: '',
            tickets:0,
            content:''
        }
    }
    componentWillMount = async () => {
        project = {} //清空
        comments = []
        project = await VotingInstance.methods.all_Votings(this.props.match.params.id).call()
        project.confirmed_ticket = web3.utils.fromWei(project.confirmed_ticket, 'ether')
        project.target_voting = web3.utils.fromWei(project.target_voting, 'ether');
        project.num_voted = web3.utils.fromWei(project.num_voted, 'ether')
        let proposal_length = project.comment_num
        for(let i = 1; i <= proposal_length; i++){
            let announcement = {
                content:'',
                amount:0,
                // agreeAmount:0,
                // disAmount:0,
                // goal:0,
                isAgreed:false,
                p_state:'',
                my_attitude:false,
                total:0
            }
            result = []
            result = await VotingInstance.methods.receiveAnnouncement(this.props.match.params.id, i).call()
            announcement.content = result[0]
            announcement.amount = result[1]
            announcement.amount = web3.utils.fromWei(announcement.amount, 'ether')
            // announcement.agreeAmount = result[2]
            // announcement.agreeAmount = web3.utils.fromWei(announcement.agreeAmount, 'ether')
            // announcement.disAmount = result[3]
            // announcement.goal = result[4]
            // announcement.goal = web3.utils.fromWei(announcement.goal, 'ether')
            // announcement.total = announcement.goal * 2
            announcement.isAgreed = result[2]
            console.log(announcement.isAgreed)
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
    async up(e, value, proposal_id){
        let flag
        if(value === 1){
            flag = true
            await VotingInstance.methods.confirmAnnouncement(this.props.match.params.id, proposal_id.index + 1, flag).send({from:this.state.accounts[0]})
            //comments[proposal_id.index].my_attitude = true
            alert('批准申请成功!')
        }
        else{
            flag = false
            await VotingInstance.methods.confirmAnnouncement(this.props.match.params.id, proposal_id.index + 1, flag).send({from:this.state.accounts[0]})
            //comments[proposal_id].my_attitude = false
            alert('否决申请成功!')
        }
    }
    render() {
        return (
            <div id="wrapper">

<<<<<<< HEAD
=======
                <ul className="navbar-nav col-xl-1 bg-warning sidebar sidebar-dark accordion" id="accordionSidebar">

                        <a className="sidebar-brand d-flex align-items-center justify-content-center">
                            <div className="sidebar-brand-text mx-2">投票系统</div>
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
                                <span>所有投票</span></Link>
                        </li>
                        {/*<!-- Divider -->*/}
                        {/*<hr className="sidebar-divider">*/}

                        <li className="nav-item">
                            <Link className="nav-link" to='/voting_creator'>
                                <span>发起投票</span></Link>
                        </li>

                        {/*<!-- Divider -->*/}
                        {/*<hr className="sidebar-divider">*/}

                        <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                               aria-expanded="true" aria-controls="collapseTwo">
                                <span>我的投票</span>
                            </a>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                                 data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">我的投票:</h6>
                                    <Link className="collapse-item" to="/mine_voting">我发起的投票</Link>
                                    <Link className="collapse-item" to="/attend_voting">我参与的投票</Link>
                                </div>
                            </div>
                        </li>

                    </ul>

>>>>>>> 0c0eb1ee53a41a37f919412ccdf017cddc6f58d6
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

									<a className="sidebar-brand d-flex align-items-center justify-content-center">
										<div className="sidebar-brand-text mx-2">投票系统</div>
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
											<span>所有投票</span></Link>
									</li>
									{/*<!-- Divider -->*/}
									{/*<hr className="sidebar-divider">*/}

									<li className="nav-item">
										<Link className="nav-link" to='/voting_creator'>
											<span>发起投票</span></Link>
									</li>

									{/*<!-- Divider -->*/}
									{/*<hr className="sidebar-divider">*/}
									
									<li className="nav-item">
										<Link className="nav-link" to='/mine_voting'>
											<span>我发起的投票</span></Link>
									</li>
									
									<li className="nav-item">
										<Link className="nav-link" to='/attend_voting'>
											<span>我参与的投票</span></Link>
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
                                    <h3 className="m-0 font-weight-bold">投票项目详情</h3>
                                    <div className="card-body">
                                        <div className="table-responsive" class="row">
                                            <div className="col-lg-12">
                                                    <div className="card-body">
                                                        <h5>投票项目发起人：<strong>{project.creator_addr}</strong></h5>
                                                    </div>
                                            </div>
                                            <div class="col-lg-6">
                                                    <div className="card-body">
                                                        <h5>投票项目名称：<strong>{project.title}</strong><span className="badge badge-warning ml-3">募集截止日期：{ddl}</span></h5>
                                                    </div>
                                                    <div className="card-body">
                                                        <h5>投票项目状态：<strong>{state}</strong></h5>
                                                    </div>
                                            </div>
                                            <div className="col-lg-6">
                                                    <div className="card-body">
                                                        <h5>投票项目目标投票人数：<strong>{project.target_voting}eth</strong></h5>
                                                    </div>
                                                    <div className="card-body">
<<<<<<< HEAD
                                                        <h5>投票项目可用资金：<strong>{project.num_voted - project.confirmed_ticket}eth</strong></h5>
=======
                                                        <h5>投票项目可用资金：<strong>{project.num_voted - project.usedMoney}eth</strong></h5>
>>>>>>> 0c0eb1ee53a41a37f919412ccdf017cddc6f58d6
                                                    </div>
                                            </div>
                                            <div className="col-lg-6">
                                                    <div className="card-body">
<<<<<<< HEAD
                                                        <h5>投票项目已使用资金：<strong>{project.confirmed_ticket}eth</strong></h5>
=======
                                                        <h5>投票项目已使用资金：<strong>{project.usedMoney}eth</strong></h5>
>>>>>>> 0c0eb1ee53a41a37f919412ccdf017cddc6f58d6
                                                    </div>
                                            </div>
                                            <div className="col-lg-6">
                                                    <div className="card-body">
                                                        <h5>投票项目投资人数：<strong>{project.voter_num}</strong></h5>
                                                    </div>
                                            </div>
                                            <div className="col-lg-12">
                                                    <div className="card-body">
                                                        <h5>投票项目概述：</h5>
                                                        <p>
                                                            <strong>{project.content}</strong>
                                                        </p>
                                                    </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="card-header py-3">
                                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                            <h5 className="m-0 font-weight-bold">使用情况详情</h5>
                                        </div>
                                        <div className="col-lg-12">
                                            {
                                                (comments.length===0)
                                                    ?null
                                                    :comments.map((item,index)=>{
                                                        return (
                                                            <div className="">
                                                                <div className="card-header py-3">
                                                                    <a className="btn btn-success btn-icon-split" style={{float: "left"}} type="submit" onClick={ e => this.up(e,1, {index}) }>
                                                                        <span className="icon text-white-50"><i className="fas fa-check"/></span>
                                                                        <span className="text">同意</span>
                                                                    </a>&nbsp;&nbsp;&nbsp;
                                                                    <a className="btn btn-danger btn-icon-split" type="submit" onClick={ e => this.up(e,0, {index}) }>
                                                                        <span className="icon text-white-50">
                                                                            <i className="fas fa-trash"/>
                                                                        </span>
                                                                        <span className="text">拒绝</span>
                                                                    </a>
                                                                </div>
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-xl-6 col-md-6 mb-4">
                                                                                <div className="card-body">
                                                                                    <div className="row no-gutters align-items-center">
                                                                                        <div className="col mr-2">
                                                                                            <div
                                                                                                className="text-ls font-weight-bold text-uppercase mb-1">
                                                                                                申请金额
                                                                                            </div>
                                                                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{item.amount}eth</div>
                                                                                        </div>
                                                                                        <div className="col-auto">
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                        </div>
                                                                        {/* <div className="col-xl-6 col-md-6 mb-4">
                                                                                <div className="card-body">
                                                                                    <div className="row no-gutters align-items-center">
                                                                                        <div className="col mr-2">
                                                                                            <div
                                                                                                className="text-ls font-weight-bold text-uppercase mb-1">同意百分比
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
                                                                        </div> */}
                                                                        <div className="col-xl-12 col-md-6 mb-4">
                                                                                <div className="card-body">
                                                                                    <div className="row no-gutters align-items-center">
                                                                                        <div className="col mr-2">
                                                                                            <div
                                                                                                className="text-ls font-weight-bold text-uppercase mb-1">
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
                                                            </div>
                                                        )
                                                    },this)
                                            }
                                        </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default attend_voting_info;