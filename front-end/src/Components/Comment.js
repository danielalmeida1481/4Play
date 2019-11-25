import React from 'react'
import AppImage from '../4Play.png'

class Comment extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: this.props.title,
            text: this.props.text
        }
    }

    render() {
        return (
            <div className="media mt-3">
                <img src={AppImage} style={{maxHeight: 64, maxWidth: 64}} className="mr-3" alt="Icon" />
                <div className="media-body">
                    <h5 className="mt-0 t-pink-color">{this.state.title}</h5>
                    <p>{this.state.text}</p>
                </div>
            </div>
        )
    }
}

export default Comment
