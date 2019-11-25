import React from 'react'

import { Link, Redirect } from 'react-router-dom';

import AppImage from '../../Components/AppImage'
import DisplayErrors from '../../Components/DisplayErrors'

import apiController from '../../Helpers/apiController'
import Auth from '../../Components/Auth';

class Register extends Auth {

    constructor(props) {
        super(props)

        this.state = {
            registed: false,
            validationError: {
                value: false,
                errors: []
            },
            singleError: {
                value: false,
                errors: []
            },
            formData: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                isMale: true
            }
        }
    }

    handleUserInput(e) {
        const name = e.target.name
        const value = e.target.value

        var formData = this.state.formData
        formData[name] = value

        this.setState({formData: formData})

        if (this.state.validationError.value) {
            this.setState({validationError: {value: false, errors: []}})
        }

        if (this.state.singleError.value) {
            this.setState({singleError: {value: false, errors: []}})
        }
    }

    handleGenderSelection(isMale) {
        var formData = this.state.formData

        if (isMale) {
            formData.isMale = true
        } else {
            formData.isMale = false
        }

        this.setState({formData: formData})
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.handleClickRegister()
        }
    }

    handleClickRegister() {
        if (this.state.validationError.value) {
            this.setState({validationError: {value: false, errors: []}})
        }

        if (this.state.singleError.value) {
            this.setState({singleError: {value: false, errors: []}})
        }

        apiController.post('auth/register', this.state.formData)
        .then(res => {
            var data = res.data

            if (data.error === true) {
                if (typeof(data.message) !== 'undefined') {
                    var tempErrors = []
                    tempErrors.push(data.message)

                    this.setState({singleError: {value: true, errors: tempErrors}})
                } else {
                    this.setState({validationError: {
                        value: true,
                        errors: data.data
                    }})
                }
            } else {
                this.setState({
                    registed: true
                })
            }
        })
    }

    render() {
        if (this.state.registed) {
            return (
                <Redirect to="/login" />
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
                                            <label htmlFor="txbName">Name</label>
                                            <input id="txbName" name="name" onKeyDown={(event) => this.handleKeyDown(event)}  onChange={(event) => this.handleUserInput(event)} type="text" className="form-control" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="txbEmail">Email</label>
                                            <input id="txbEmail" name="email" onKeyDown={(event) => this.handleKeyDown(event)}  onChange={(event) => this.handleUserInput(event)} type="email" className="form-control" />
                                        </div>

                                        <div className="row">
                                            <div className="col-xl-6 p-0 pr-xl-1">
                                                <div className="form-group">
                                                    <label htmlFor="txbPassword">Password</label>
                                                    <input id="txbPassword" name="password" onKeyDown={(event) => this.handleKeyDown(event)}  onChange={(event) => this.handleUserInput(event)} type="password" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="col-xl-6 p-0 pl-xl-1">
                                                <div className="form-group">
                                                    <label htmlFor="txbConfirmPassword">Confirm Password</label>
                                                    <input 
                                                    id="txbConfirmPassword" 
                                                    name="confirmPassword" 
                                                    onKeyDown={(event) => this.handleKeyDown(event)} 
                                                    onChange={(event) => this.handleUserInput(event)}
                                                    type="password" 
                                                    className="form-control" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="form-group">
                                                <label>Género</label><br />
                                                
                                                <button type="button" className={"btn mr-1 " + (this.state.formData.isMale ? "btn-default" : "btn-outline-default" )} onClick={() => this.handleGenderSelection(true)}>
                                                    <i className="fas fa-mars fa-fw"></i>
                                                    Masculino
                                                </button>

                                                <button type="button" className={"btn mr-1 " + (!this.state.formData.isMale && this.state.formData.isMale != null ? "btn-default" : "btn-outline-default" )} onClick={() => this.handleGenderSelection(false)}>
                                                    <i className="fas fa-venus fa-fw"></i>
                                                    Feminino
                                                </button>
                                            </div>
                                        </div>
     
                                        <button type="button" onClick={() => this.handleClickRegister()} className="btn btn-default w-100">
                                            Register
                                        </button>

                                        <DisplayErrors errors={this.state.validationError.errors} singleError={false} />
                                        <DisplayErrors errors={this.state.singleError.errors} singleError={true} />
                                    </div>
                                </div>

                                <div className="t-center">
                                    <Link className="a-default" to="/login">Já tens uma conta? Faz login</Link>
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

export default Register
