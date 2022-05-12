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
                alert('恭喜您，发起投票项目成功！')
            }
        }
    }
    render() {
        return (
            <div id="wrapper">

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

                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-2 d-none d-lg-block"/>
                            <div className="col-lg-8">
                                <div className="p-5" id="user">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">发起投票</h1>
                                    </div>
                                    <form className="user">
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input type="text" className="form-control form-control-user" name="Name" placeholder="投票项目名称" value={this.state.Name} onChange={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-6">
                                                <input type="number" min="0" className="form-control form-control-user" name="Amount" placeholder="投票项目金额" value={this.state.Amount} onChange={this.handleChange}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">投票截止日期</label>
                                            <input type="date" className="form-control form-control-user" name="endtime" value={this.state.endtime} onChange={this.handleChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">项目概述</label>
                                            <textarea className="form-control" rows="5" name="overview" value={this.state.overview} onChange={this.handleChange}/>
                                        </div>
                                        <a className="btn btn-warning btn-user btn-block" type='submit' onClick={this.up}>
                                            确认发起
                                        </a>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>


            </div>
        );
    }
}

export default voting_creator;