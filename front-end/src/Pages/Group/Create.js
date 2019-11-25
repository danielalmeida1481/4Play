import React from 'react'
import { Redirect } from 'react-router-dom'

import Navbar from '../../Components/Navbar'
import Auth from '../../Components/Auth'
import DisplayErrors from '../../Components/DisplayErrors'

import apiController from '../../Helpers/apiController'

class CreateGroup extends Auth {
    constructor(props) {
        super(props)

        this.state = {
            groupCreated: false,
            groupId: '',
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
                description: ''
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

    handleCreateGroup() {
        if (this.state.validationError.value) {
            this.setState({validationError: {value: false, errors: []}})
        }

        if (this.state.singleError.value) {
            this.setState({singleError: {value: false, errors: []}})
        }

        apiController.post('group', this.state.formData)
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
                    groupCreated: true,
                    groupId: data.groupId
                })
            }
        })
    }

    render() {
        if (this.state.groupCreated) {
            return (
                <Redirect to={"/group/" + this.state.groupId} />
            )
        }

        return (
            <div className="react-grouper">
                <Navbar />
                
                <div className="row">
                    <div className="col-12">
                        <div className="row-default">
                            <form>
                                <div className="row">
                                    <div className="col-xl-7 mb-3">
                                        <p className="row-title mb-3">Criar grupo</p>

                                        <div className="form-group">
                                            <label htmlFor="txbName">Nome</label>
                                            <input id="txbName" name="name" type="text" className="form-control" 
                                            onChange={(event) => this.handleUserInput(event)} value={this.state.formData.name}/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="txbDescription">Descrição</label>
                                            <textarea id="txbDescription" name="description" rows="4" className="form-control"
                                            onChange={(event) => this.handleUserInput(event)} value={this.state.formData.description}></textarea>
                                        </div>
     
                                        <button type="button" onClick={() => this.handleCreateGroup()} className="btn btn-default w-100">
                                            Criar
                                        </button>

                                        <DisplayErrors errors={this.state.validationError.errors} singleError={false} />
                                        <DisplayErrors errors={this.state.singleError.errors} singleError={true} />
                                    </div>

                                    <div className="col-xl-5">
                                        <p className="row-title mb-3">Dicas</p>

                                        <h3>Em breve...</h3>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateGroup
