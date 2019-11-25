import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Auth from '../Components/Auth'
import LoadingApp from '../Components/LoadingApp'
import Group from '../Components/GroupComponent'

import apiController from '../Helpers/apiController'

class Main extends Auth {
    constructor(props) {
        super(props)

        this.state = {
            isLoaded: false,
            groups: [],
            userName: localStorage.getItem('userName') || "User"
        }
    }

    componentDidMount() {
        this.getGroups()
    }

    getGroups() {
        apiController.get('group/my')
        .then(res => {
            this.setState({
                isLoaded: true,
                groups: res.data
            })
        })
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <div className="react-grouper">
                    <Navbar />
    
                    <div className="row">
                        <div className="col-12">
                            <div className="row-default">
                                <LoadingApp />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="react-grouper">
                <Navbar />
                
                <div className="row">
                    <div className="col-12">
                        <div className="row-default">
                            <div className="row mb-3">
                                <div className="col-12">
                                    <div className="float-left">
                                        <p className="row-title">Os meus grupos</p>
                                    </div>

                                    <div className="float-right">
                                        <Link to="/group/create">
                                            <button className="btn btn-default">
                                                <i className="fas fa-users"></i> Criar grupo
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div id="divGroups">
                            {
                                !this.state.groups.data.length ? 
                                <div className="t-center mt-5 mb-5">
                                    <i className="fas fa-users t-50px"></i>
                                    <h1 className="t-pink-color mt-3">Nenhum grupo encontrado</h1>
                                </div>
                                :
                                this.state.groups.data.map(function(item){
                                    return (<Group groupName={item.groupName} groupPoints={0} groupId={item._id} key={item._id} />)
                                })
                            }
                            </div>                        
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main
