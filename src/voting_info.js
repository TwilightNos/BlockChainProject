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
        const name=event.target.name;
        const value=event.target.value;
        this.setState({
            [name]:value
        })
    }
    componentWillMount = async () => {
        project = {}
        project = await VotingInstance.methods.all_Votings(this.props.match.params.id).call()
        project.target_voting = web3.utils.fromWei(project.target_voting, 'ether');
        project.num_voted = web3.utils.fromWei(project.num_voted, 'ether')
        console.log(project)
        ddl = project.endtime
        let current_time = Date.parse(new Date())
        if(project.isSuccess === true){
            state = "Voting Finished"
        }
        else{
            if(ddl - current_time >= 0){
                state = "Voting in Progress"
            }
            else{
                state = "Project is overdue"
            }
        }
        ddl = (new Date(parseInt(ddl))).toLocaleDateString()
        let accounts = await web3.eth.getAccounts()
        this.setState({
            accounts: accounts
        })
    };
    async up(){
        if (this.state.tickets === 0){
            alert('Amount must be more than 1')
        }
        else{
            if(this.state.tickets > (project.target_voting - project.num_voted)){
                alert('The Voting Requirement has been Satisfied！')
            }
            else if(this.state.tickets == 1){
                await VotingInstance.methods.Vote_sender(this.props.match.params.id).send({
                    from: this.state.accounts[0],
                    value: web3.utils.toWei(this.state.tickets,'ether')
                })
                alert('Voting Success1！')
            }
            else if(this.state.tickets == 2){
                await VotingInstance.methods.Vote_sender(this.props.match.params.id).send({
                    from: this.state.accounts[0],
                    value: web3.utils.toWei(this.state.tickets,'ether')
                })
                alert('Voting Success2！')
            }
        }
    }
    render() {
        return (
            <div id="wrapper">

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
										<div className="sidebar-brand-text mx-2">Voting System</div>
									</a>

									{/*<!-- Divider -->*/}
									{/*<hr className="sidebar-divider my-0">*/}

									{/*// <!-- Nav Item - Dashboard -->*/}
									<li className="nav-item  active">
										<Link className="nav-link" to='/basic_template'>
											<span>Home</span></Link>
									</li>

									<li className="nav-item">
										<Link className="nav-link" to='/all_votings'>
											<span>All Voting</span></Link>
									</li>
									{/*<!-- Divider -->*/}
									{/*<hr className="sidebar-divider">*/}

									<li className="nav-item">
										<Link className="nav-link" to='/voting_creator'>
											<span>Initiate Voting</span></Link>
									</li>
                                    <li className="nav-item dropdown no-arrow">
                                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span className="mr-2 d-none d-lg-inline text-light small">
                                            Current Account Address：{this.state.accounts[0]}</span>
                                        </a>
                                    </li>

                                </ul>

                            </nav>

                        <div class="container-fluid">
                                    <h1 className="h3 mb-0 text-gray-800">Voting Detail</h1>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive" class="row">
                                        <div class="col-lg-12">
                                                <div className="card-body">
                                                    <h5>Voting Initiator：<strong>{project.creator_addr}</strong></h5>
                                                </div>
                                        </div>
                                        <div class="col-lg-6">
                                                <div className="card-body">
                                                    <h5>Voting Name：<strong>{project.title}</strong><span className="badge badge-warning ml-3">募集截止日期：{ddl}</span></h5>
                                                </div>
                                                <div className="card-body">
                                                    <h5>Voting Status：<strong>{state}</strong></h5>
                                                </div>

                                        </div>
                                        <div class="col-lg-6">
                                                <div className="card-body">
                                                    <h5>Voting Target：<strong>{project.target_voting}eth</strong></h5>
                                                </div>
                                                <div className="card-body">
                                                    <h5>Number of tickets voted：<strong>{project.num_voted}eth</strong></h5>
                                                </div>
                                        </div>
                                        <div class="col-lg-6">
                                                <div className="card-body">
                                                    <h5>Tickets already used：<strong>{project.confirmed_ticket}eth</strong></h5>
                                                </div>
                                        </div>
										<div class="col-lg-6">
                                                <div className="card-body">
                                                    <h5>Voters：<strong>{project.voter_num}</strong></h5>
                                                </div>
                                        </div>
                                        <div class="col-lg-12">
                                                <div className="card-body">
                                                    <h5>Voting Introduction：</h5>
                                                    <p>
                                                        <strong>{project.content}</strong>
                                                    </p>
                                                </div>
                                        </div>
                                        <div class="col-lg">
                                            <a href="#" className="btn btn-success btn-icon-split"  style={{float:"center"}}
                                               data-target="#myModal" data-toggle="modal">
                                                <span className="text">Vote</span>
                                            </a>
                                            <div className="modal fade" id="myModal" tabIndex="-1" role="dialog"
                                                 aria-labelledby="myModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h4 className="modal-title" id="myModalLabel">
                                                                Voting Number
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
                                                                    data-dismiss="modal">Close
                                                            </button>
                                                            <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={this.up}>
                                                                Vote
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