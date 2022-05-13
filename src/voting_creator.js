import React, { Component } from "react";
import {Link} from "react-router-dom";
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
        const name=event.target.name;
        const value=event.target.value;
        this.setState({
            [name]:value
        })
    }
    async up(){
        if (this.state.Name === "" || this.state.Amount === "" || this.state.endtime === "" || this.state.overview === ""){
            alert('Please Fill in the Blank')
        }
        else{
            let timestamp = new Date(this.state.endtime).getTime();
            console.log(timestamp);
            let a=(new Date()).toLocaleDateString();
            a =a.replace(/\//g,'-');
            let current_date= (new Date(a));
            console.log(current_date)
            if(current_date - timestamp >= 0){
                alert('Please Choose a Valid Date')
            }
            else{
                let amount = web3.utils.toWei(this.state.Amount, 'ether')
                console.log(amount)
                let accounts = await web3.eth.getAccounts()
                await VotingInstance.methods.Voting_constructor(accounts[0], this.state.Name, this.state.overview, amount, timestamp).send({
                    from: accounts[0]
                })
                alert('congratulations! Voting Successfully Proposed!')
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
										<div className="sidebar-brand-text mx-2">Voting System</div>
									</a>

									{/*<!-- Divider -->*/}
									{/*<hr className="sidebar-divider my-0">*/}

									{/*// <!-- Nav Item - Dashboard -->*/}
									<li className="nav-item  active">
										<Link className="nav-link" to='/home'>
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

									{/*<!-- Divider -->*/}
									{/*<hr className="sidebar-divider">*/}
									
									<li className="nav-item">
										<Link className="nav-link" to='/mine_voting'>
											<span>Initiated Voting</span></Link>
									</li>
									
									<li className="nav-item">
										<Link className="nav-link" to='/attend_voting'>
											<span>Participated Voting</span></Link>
									</li>

                                </ul>

                            </nav>
							
						<div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Propose a Voting</h1>
                                    </div>
                                    <form className="user">
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input type="text" className="form-control form-control-user rounded" name="Name" placeholder="Voting Name" value={this.state.Name} onChange={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-6">
                                                <input type="number" min="0" className="form-control form-control-user rounded" name="Amount" placeholder="Voting Amount" value={this.state.Amount} onChange={this.handleChange}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Voting Deadline</label>
                                            <input type="date" className="form-control form-control-user rounded" name="endtime" value={this.state.endtime} onChange={this.handleChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Introduction</label>
                                            <textarea className="form-control rounded" rows="5" name="overview" value={this.state.overview} onChange={this.handleChange}/>
                                        </div>
                                        <a className="btn btn-warning btn-user btn-block" type='submit' onClick={this.up}>
                                            Propose
                                        </a>
                                    </form>


                        </div>

				</div>
            </div>
        );
    }
}

export default voting_creator;