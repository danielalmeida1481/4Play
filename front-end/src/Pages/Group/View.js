import React from 'react'

import Navbar from '../../Components/Navbar'
import Auth from '../../Components/Auth'
import LoadingApp from '../../Components/LoadingApp'

import apiController from '../../Helpers/apiController'

class ViewGroup extends Auth {
    constructor(props) {
        super(props)

        this.state = {
            isLoaded: false,
            group: []
        }
    }

    componentDidMount() {
        const { groupId } = this.props.match.params
        this.getGroup(groupId)
    }

    getGroup(groupId) {
        apiController.get(`group/${groupId}`)
        .then(res => {
            this.setState({
                isLoaded: true,
                group: res.data
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
                    <div className="col-lg-4 mb-2">
                        <div className="row-default t-center">
                            <i className="fas fa-users" style={{fontSize: 250}}></i>

                            <p className="profile-name mt-3 mb-3">{this.state.group.data.name}</p>
                        </div>
                    </div>

                    <div className="col">
                        <div className="row-default">
                            <p className="row-title mb-3">Classificações</p>

                            <div className="row rowComp">
                            {
                                this.state.group.data.members.map(item => {
                                    return (
                                        <div className="col-sm-4 mb-2 pl-1 pr-1" key={"player/" + item._id}>
                                            <div className="card card-default text-center row-default w-100">
                                                {
                                                    item.isMale ? 
                                                    (<i className="fas fa-male" style={{fontSize: 100}}></i>) : 
                                                    (<i className="fas fa-female" style={{fontSize: 100}}></i>)
                                                }

                                                <div className="card-body">
                                                    <h5 className="profile-name">{ item.name }</h5>
                                                </div>
                                            </div>
                                        </div>
                                    )
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

export default ViewGroup
