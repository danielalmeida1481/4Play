import React from 'react'
import { Link } from 'react-router-dom'

import AppImage from '../4Play.png'

class Group extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            groupId: this.props.groupId,
            groupName: this.props.groupName,
            groupPoints: this.props.groupPoints || 0
        }
    }

    render() {
        return (
            <div className="row mb-5 mt-5">
                <div className="col-4 t-center">
                    <div className="row v-center">
                        <div className="col">
                            <img src={AppImage} className="img-fluid mb-3" style={{maxHeight: 100}} alt="Imagem do grupo" />
                            <br />
                            <Link to={"/group/" + this.state.groupId}>
                                <button className="btn btn-default">
                                    Ver Grupo
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="row v-center">
                        <div className="col mb-2">
                            <p className="row-title">Grupo</p>
                            <p className="profile-name" style={{wordBreak: 'break-all'}}>{ this.state.groupName }</p>
                        </div>

                        <div className="col">
                            <p className="row-title">Pontos</p>
                            <p className="profile-name">{ this.state.groupPoints }/300</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Group
