import React, { Component } from "react";
import {Link} from "react-router-dom";
let VotingInstance = require('./Voting')
let web3 = require('./Web3');
let projects = []
let etime = ''
let state = ''
let style = ''
let project = {}
class all_votings extends  React.Component {
    constructor() {
        super()
        this.state = {
            accounts: ''
        }
    }
    Is_complete_style(id){
        project = projects[id]
        etime = project.endtime
        let current_time = Date.parse(new Date())
        if(project.isComplete === true){
            style = "badge badge-info ml-3"
        }
        else{
            if(etime - current_time >= 0){
                style = "badge badge-warning ml-3"
            }
            else{
                style = "badge badge-secondary ml-3"
            }
        }
        return style
    }
    Is_complete(id){
        project = projects[id]
        console.log(project)
        etime = project.endtime
        let current_time = Date.parse(new Date())
        if(project.isComplete === true){
            state = "Voting Finished"
        }
        else{
            if(etime - current_time >= 0){
                state = "Voting in Progress"
            }
            else{
                state = "Project is overdue"
            }
        }
        return state
    }
    componentWillMount = async () => {
        projects = []
        let accounts = await web3.eth.getAccounts()
        let projects_number = await VotingInstance.methods.all_votings_num().call()
        for(let i = 0; i < projects_number; i++){
            let project = await VotingInstance.methods.all_Votings(i).call()
            projects.push(project)
        }
        this.setState({
            accounts: accounts
        })
    };
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
									<li className="nav-item  active">
										<Link className="nav-link" to='/basic_template'>
											<span>Home</span></Link>
									</li>

									<li className="nav-item">
										<Link className="nav-link" to='/all_votings'>
											<span>All Voting</span></Link>
									</li>
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
                            <div className="row">

                                <div className="col-lg-12">
                                    {
                                        (projects.length===0)
                                            ?null
                                            :projects.map((item,index)=>{
                                                return (
                                                        <div className="card-body">
                                                            Voting Project Name: {item.title}
                                                            <Link className="btn btn-warning" style={{float:"right"}}
                                                                  to={{ pathname: '/voting_info/' + index}}>Details</Link>
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

export default all_votings;