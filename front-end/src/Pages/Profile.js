import React from 'react'
import apiController from '../Helpers/apiController'

import Navbar from '../Components/Navbar'
import LoadingApp from '../Components/LoadingApp'
// import UserImage from '../Assets/Images/user.png'
import Auth from '../Components/Auth'

class Profile extends Auth {
    constructor(props) {
        super(props)

        this.state = {
            isLoaded: false,
            userData: []
        }
    }

    componentDidMount() {
        const { userId } = this.props.match.params
        this.getUserData(userId)
    }

    componentDidUpdate(prevProps) {
        const { userId } = this.props.match.params
        if (userId !== prevProps.match.params.userId) {
            this.getUserData(userId)
        }
    }



    getUserData(userId = null) {
        this.setState({
            isLoaded: false
        })

        if (userId) {
            apiController.get(`user/${userId}`)
            .then(res => {
                this.setState({
                    isLoaded: true,
                    userData: res.data
                })
            })
        } else {
            apiController.get('user/')
            .then(res => {
                this.setState({
                    isLoaded: true,
                    userData: res.data
                })
            })
        }
    }

    render() {
        if (this.state.isLoaded) {
            if (this.state.userData.error === true) {
                // TODO: Handle errors
            } else {
                return (
                    <div className="react-grouper">
                        <Navbar />

                        <div className="row">
                            <div className="col-lg-4 mb-2">
                                <div className="row-default t-center">
                                    {/* <img src={ UserImage } alt="4Play" className="img-fluid mx-auto d-block" /> */}

                                    {
                                        this.state.userData.data.isMale ? 
                                        (<i className="fas fa-male" style={{fontSize: 250}}></i>) : 
                                        (<i className="fas fa-female" style={{fontSize: 250}}></i>)
                                    }

                                    <p className="profile-name mt-3 mb-3">{this.state.userData.data.name}</p>
                                </div>
                            </div>

                            <div className="col"></div>

                            <div className="col-lg-4">
                                <div className="row-default">
                                    <p className="row-title mb-3">Conquistas</p>

                                    <div className="row">
                                        <div className="profile-badge col align-self-center">
                                            <i className="fas fa-fighter-jet"></i>
                                            <p>Mais rápido que um F-16</p>
                                        </div>

                                        <div className="profile-badge col align-self-center">
                                            <i className="fas fa-house-damage"></i>
                                            <p>Até a barraca abana</p>
                                        </div>

                                        <div className="profile-badge col align-self-center">
                                            <i className="fas fa-rocket"></i>
                                            <p>Para o infinito e mais além</p>
                                        </div>

                                        <div className="profile-badge col align-self-center">
                                            <i className="fas fa-hand-rock"></i>
                                            <p>Mão de ouro</p>
                                        </div>

                                        <div className="profile-badge col align-self-center">
                                            <i className="fab fa-accessible-icon"></i>
                                            <p>Drifter profissional</p>
                                        </div>

                                        <div className="profile-badge col align-self-center">
                                            <i className="fas fa-umbrella"></i>
                                            <p>"Squirter"</p>
                                        </div>

                                        <div className="profile-badge col align-self-center">
                                            <i className="fas fa-pray"></i>
                                            <p>Ajoelhou vai ter que rezar</p>
                                        </div>

                                        <div className="profile-badge col align-self-center">
                                            <i className="fas fa-golf-ball"></i>
                                            <p>"Hole in one"</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
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

export default Profile
