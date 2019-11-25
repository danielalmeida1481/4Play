import React from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'

import LoadingApp from '../Components/LoadingApp'
import apiController from '../Helpers/apiController'
import Auth from '../Components/Auth'

class Players extends Auth {
    constructor(props) {
        super(props)

        this.state = {
            isLoaded: false,
            playersData: [],
            showPlayersData: []
        }
    }

    componentDidMount() {
        this.getPlayersData()
    }

    handleSearch(search) {
        if (!this.state.isLoaded) {
            return
        }

        var searchResult = []
        
        this.state.playersData.data.forEach(item => {
            if (item.name.toLowerCase().includes(search.toLowerCase())) {
                searchResult.push(item)
            }
        })

        this.setState({
            showPlayersData: {
                data: searchResult
            }
        })
    }

    getPlayersData() {
        this.setState({
            isLoaded: false
        })

        apiController.get('user/all')
        .then(res => {
            this.setState({
                isLoaded: true,
                playersData: res.data,
                showPlayersData: res.data
            })
        })
    }

    render() {
        if (this.state.isLoaded) {
            if (this.state.playersData.error === true) {
                // TODO: Handle errors
            } else {
                return (
                    <div className="react-grouper">
                        <Navbar />

                        <div className="row">
                            <div className="col-12">
                                <div className="row-default w-100">
                                    <div className="row">
                                        <input 
                                        type="text" 
                                        className="form-control" 
                                        style={{width:'28%'}} 
                                        placeholder="Pesquisar..."
                                        onChange={(e) => this.handleSearch(e.target.value)}
                                         />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row rowComp">
                        {
                            // No Player found
                            this.state.showPlayersData.data.length ? '' : 
                            <div className="col-12">
                                <div className="row-default w-100">
                                    <h1 className="t-center m-5">Jogador não encontrado</h1>
                                </div>
                            </div>
                        }

                        {
                            this.state.showPlayersData.data.map(function(item) {
                                return (
                                    <div className="col-lg-4 mb-2" key={"player/" + item._id}>
                                        <div className="card card-default text-center row-default w-100">
                                            {
                                                item.isMale ? 
                                                (<i className="fas fa-male" style={{fontSize: 100}}></i>) : 
                                                (<i className="fas fa-female" style={{fontSize: 100}}></i>)
                                            }

                                            <div className="card-body">
                                                <h5 className="profile-name mb-4">{ item.name }</h5>
                                                <Link className="btn btn-default" to={ "/profile/" + item._id }>Ver Jogador</Link>
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
}

export default Players
