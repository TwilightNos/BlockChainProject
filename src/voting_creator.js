import React, { Component } from "react";
import {Link} from "react-router-dom";
import ReactDOM from 'react-dom';
import FundingContract from "./contracts/Voting.json";
let VotingInstance = require('./Voting')
let web3 = require('./Web3');
class voting_creator extends  React.Component {

    constructor(props){
        super(props)
        this.state={
            Name:"",
            Amount:0,
            endtime:"",
            overview:""
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
    async up(){
        if (this.state.Name === "" || this.state.Amount === "" || this.state.endtime === "" || this.state.overview === ""){
            alert('请填写表单中的所有内容！')
        }
        else{
            let timestamp = new Date(this.state.endtime).getTime();
            console.log(timestamp);
            let a=(new Date()).toLocaleDateString();//获取当前日期
            a =a.replace(/\//g,'-');
            let current_date= (new Date(a));//把当前日期变成时间戳
            console.log(current_date)
            if(current_date - timestamp >= 0){
                alert('请选择有效的截止日期！')
            }
            else{
                let amount = web3.utils.toWei(this.state.Amount, 'ether')
                console.log(amount)
                let accounts = await web3.eth.getAccounts()
                await VotingInstance.methods.Voting_constructor(accounts[0], this.state.Name, this.state.overview, amount, timestamp).send({
                    from: accounts[0]
                })
                alert('恭喜您，发起众筹项目成功！')
            }
        }
    }
    render() {
        return (
            <div id="wrapper">
			<div id="content-wrapper" className="d-flex flex-column">
				<div id="content">

                            <nav className="navbar navbar-expand navbar-light bg-danger topbar mb-8 static-top shadow">


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

                                </ul>

                            </nav>
							
						<div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">发起投票</h1>
                                    </div>
                                    <form className="user">
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input type="text" className="form-control form-control-user rounded" name="Name" placeholder="投票项目名称" value={this.state.Name} onChange={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-6">
                                                <input type="number" min="0" className="form-control form-control-user rounded" name="Amount" placeholder="投票项目金额" value={this.state.Amount} onChange={this.handleChange}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">投票截止日期</label>
                                            <input type="date" className="form-control form-control-user rounded" name="endtime" value={this.state.endtime} onChange={this.handleChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">项目概述</label>
                                            <textarea className="form-control rounded" rows="5" name="overview" value={this.state.overview} onChange={this.handleChange}/>
                                        </div>
                                        <a className="btn btn-warning btn-user btn-block" type='submit' onClick={this.up}>
                                            确认发起
                                        </a>
                                    </form>


                        </div>

				</div>
            </div>
        );
    }
}

export default voting_creator;