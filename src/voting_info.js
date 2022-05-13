import React, { Component } from "react";
import {Link} from "react-router-dom";
let VotingInstance = require('./Voting')
let web3 = require('./Web3');
let project = {}
let state = ''
let ddl = ''
class voting_info extends  React.Component {
    constructor() {
        super();
        this.state={
            accounts: '',
            tickets:0
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
        project = {} //清空数组
        //获取当前的所有地址
        project = await VotingInstance.methods.all_Votings(this.props.match.params.id).call()
        project.confirmed_ticket = web3.utils.fromWei(project.confirmed_ticket, 'ether')
        project.target_voting = web3.utils.fromWei(project.target_voting, 'ether');
        project.num_voted = web3.utils.fromWei(project.num_voted, 'ether')
        console.log(project)
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
            alert('金额必须大于1!')
        }
        else{
            if(this.state.tickets > (project.target_voting - project.num_voted)){
                alert('您最多可再投资' + (project.target_voting - project.num_voted) + "个以太坊！")
            }
            else{
                await VotingInstance.methods.Vote_sender(this.props.match.params.id).send({
                    from: this.state.accounts[0],
                    value: web3.utils.toWei(this.state.tickets, 'ether')
                })
                alert('恭喜您，投资成功！')
            }
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
                    <li className="nav-item">
                        <Link className="nav-link" to='/home'>
                            <span>首页</span></Link>
                    </li>
                    <li className="nav-item active">
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
                                    <h1 className="h3 mb-0 text-gray-800">众筹项目详情</h1>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive" class="row">
                                        <div class="col-lg-12">
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
                                        <div class="col-lg-6">
                                                <div className="card-body">
                                                    <h5>众筹项目目标筹集资金：<strong>{project.target_voting}eth</strong></h5>
                                                </div>
                                                <div className="card-body">
                                                    <h5>众筹项目已筹集资金：<strong>{project.num_voted}eth</strong></h5>
                                                </div>
                                        </div>
                                        <div class="col-lg-6">
                                                <div className="card-body">
                                                    <h5>众筹项目已使用资金：<strong>{project.confirmed_ticket}eth</strong></h5>
                                                </div>
                                        </div>
                                        <div class="col-lg-6">
                                                <div className="card-body">
                                                    <h5>众筹项目投资人数：<strong>{project.voter_num}</strong></h5>
                                                </div>
                                        </div>
                                        <div class="col-lg-12">
                                                <div className="card-body">
                                                    <h5>众筹项目概述：</h5>
                                                    <p>
                                                        <strong>{project.content}</strong>
                                                    </p>
                                                </div>
                                        </div>
                                        <div class="col-lg">
                                            <a href="#" className="btn btn-success btn-icon-split"  style={{float:"center"}}
                                               data-target="#myModal" data-toggle="modal">
                                                <span className="text">我要投资</span>
                                            </a>
                                            <div className="modal fade" id="myModal" tabIndex="-1" role="dialog"
                                                 aria-labelledby="myModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h4 className="modal-title" id="myModalLabel">
                                                                请输入投资金额
                                                            </h4>
                                                            <button type="button" className="close" data-dismiss="modal"
                                                                    aria-hidden="true">
                                                                &times;
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <input type="number" min="0" className="form-control form-control-user" name="tickets" value={this.state.tickets} onChange={this.handleChange}/>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-default"
                                                                    data-dismiss="modal">关闭
                                                            </button>
                                                            <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={this.up}>
                                                                确认投资
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default voting_info;