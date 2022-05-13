import React, { Component } from "react";
import "./App.css";
import {Link, NavLink, Redirect, Route, Router, Switch} from "react-router-dom";
let web3 = require('./Web3');
let VotingInstance = require('./Voting')
let projects = []
let count_ongoing = 0
let finished = 0
let projects_number = 0
class basic_template extends Component {
    constructor() {
        super()
        this.state = {
            accounts: ''
        }
    }

    componentWillMount = async () => {
        count_ongoing = 0
        finished = 0
        let accounts = await web3.eth.getAccounts()
        let temp = await VotingInstance.methods.getBalance().call()
        temp = await web3.utils.fromWei(temp, 'ether')
        console.log(temp)
        projects_number = await VotingInstance.methods.all_votings_num().call()
        let current_time = Date.parse(new Date())
        for(let i = 0; i < projects_number; i++){
            let project = await VotingInstance.methods.all_Votings(i).call()
            if (project.isSuccess === true){
                finished += 1
            }
            else{
                count_ongoing += 1
            }
            projects.push(project)
        }
        this.setState({
            accounts: accounts
        })
    };
    render() {
        return (
            <div>
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

                            <div className="container-fluid">


                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Overview</h1>
                                </div>

                                <div className="row">
                                    <div className="col-xl-12 col-md-6 mb-4">
										<div className="card-body">
											<div className="row no-gutters align-items-center">
													<div
														className="text-xl font-weight-boldtext-uppercase mb-1">
														<h5>Voting Number: <strong>{projects_number}</strong></h5>
													</div>
											</div>
										</div>
                                    </div>


                                    <div className="col-xl-12 col-md-6 mb-4">
										<div className="card-body">
											<div className="row no-gutters align-items-center">
													<div
														className="text-xl font-weight-boldtext-uppercase mb-1"> <h5>Finished Voting:<strong>{finished}</strong></h5>
													</div>
											</div>
										</div>
                                    </div>


                                    <div className="col-xl-12 col-md-6 mb-4">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                        <div
                                                            className="text-xl font-weight-bold text-uppercase mb-1">
                                                            <h5>Voting in Progress: <strong>{count_ongoing}</strong></h5>
                                                        </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>




                            </div>


                        </div>

                    </div>


                </div>
                <script src="vendor/jquery/jquery.min.js"/>
                <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"/>
                <script src="vendor/jquery-easing/jquery.easing.min.js"/>
                <script src="js/sb-admin-2.min.js"/>
                <script src="vendor/chart.js/Chart.min.js"/>
                <script src="js/demo/chart-area-demo.js"/>
                <script src="js/demo/chart-pie-demo.js"/>
            </div>
        );
    }
}

export default basic_template;
