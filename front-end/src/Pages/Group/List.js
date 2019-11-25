import React from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../../Components/Navbar'
import Auth from '../../Components/Auth'
import LoadingApp from '../../Components/LoadingApp'

import apiController from '../../Helpers/apiController'

class ListGroups extends Auth {
    constructor(props) {
        super(props)

        this.state = {
            isLoaded: false,
            groups: []
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
                {
                    this.state.groups.data.map(function(item){
                        return (
                            <div className="col-md-4 mb-2" key={"player/" + item._id}>
                                <div className="card card-default text-center row-default w-100">
                                    <div className="card-body">
                                        <i className="fas fa-users" style={{fontSize: 250}}></i>

                                        <h5 className="profile-name mb-4">{ item.groupName }</h5>
                                        <Link to={ "/group/" + item._id }>
                                            <button className="btn btn-default">
                                                View Group
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )
    }
}

export default ListGroups
