import React, { Component } from 'react';

class DisplayErrors extends Component {
    constructor(props) {
        super(props)

        this.state = {
            singleError: this.props.singleError,
            errors: this.props.errors
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props !== prevProps)
        {
            this.setState({singleError: this.props.singleError, errors: this.props.errors})
        }
    }

    render() {
        const errors = this.state.errors

        if (this.state.singleError) {
            return (
                <div className="div-errors">
                    {
                        errors.map(function(item) {
                            return <p key={item}>{item}</p>
                        })
                    }
                </div>
            )
        } else {
            return (
                <div className="div-errors">
                    {
                        Object.keys(errors).map(function(key) {
                            return <p key={key}>{errors[key].message}</p>
                        })
                    }
                </div>
            )
        }
    }
}

export default DisplayErrors
