import React from 'react'
import Auth from '../../Components/Auth'
import { Link, Redirect } from 'react-router-dom'

import AppImage from '../../Components/AppImage'

import apiController from '../../Helpers/apiController'
import DisplayErrors from '../../Components/DisplayErrors'

class Login extends Auth {
    constructor(props) {
        super(props)

        this.state = {
            loggingIn: false,
            singleError: {
                value: false,
                errors: []
            },
            formData: {
                email: "",
                password: ""
            }
        }
    }

    handleUserInput(e) {
        const name = e.target.name
        const value = e.target.value

        var formData = this.state.formData
        formData[name] = value

        this.setState({formData: formData})

        if (this.state.singleError.value) {
            this.setState({singleError: {value: false, errors: []}})
        }
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.handleClickLogin()
        }
    }

    handleClickLogin() {
        apiController.post('auth/login', this.state.formData)
        .then(res => {
            var data = res.data

            if (data.error === true) {
                var tempErrors = []
                tempErrors.push(data.message)

                var singleError = {
                    value: true,
                    errors: tempErrors
                }

                this.setState({
                    singleError: singleError
                })
            } else {
                localStorage.setItem("loggedIn", true)
                localStorage.setItem("apiToken", data.token)
                localStorage.setItem("userName", data.userName)

                this.setState({
                    loggedIn: true
                })
            }
        })
    }

    render() {
        if (this.state.loggedIn) {
            return (
                <Redirect to="/main" />
            )
        }

        return (
            <div className="row vertical-center h-100-force">
                <div className="col-2"></div>


                <div className="col-md-8">
                    <div className="row row-default" style={{minHeight: 500}}>
                        <div className="col-xl-5">
                            <AppImage className="v-center" redirect={ true } />
                        </div>

                        <div className="col-xl-7">
                            <form className="p-3 v-center">
                                <div className="row">
                                    <div className="col-xl-8 offset-xl-2">
                                        <div className="form-group">
                                            <label htmlFor="txbEmail">Email</label>
                                            <input id="txbEmail" name="email" onKeyDown={(event) => this.handleKeyDown(event)} onChange={(event) => this.handleUserInput(event)} type="email" className="form-control" />
                                        </div>
                    
                                        <div className="form-group">
                                            <label htmlFor="txbPassword">Password</label>
                                            <input 
                                            id="txbPassword" 
                                            name="password" 
                                            onKeyDown={(event) => this.handleKeyDown(event)}
                                            onChange={(event) => this.handleUserInput(event)}
                                            type="password" 
                                            className="form-control" />
                                        </div>

                                        <button type="button" onClick={() => this.handleClickLogin()} className="btn btn-default w-100">
                                            Login
                                        </button>

                                        <DisplayErrors errors={this.state.singleError.errors} singleError={true} />
                                    </div>
                                </div>

                                <div className="t-center">
                                    <Link className="a-default" to="/register">Não tens uma conta? Regista-te</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


                <div className="col-2"></div>
            </div>
        )
    }
}

export default Login
