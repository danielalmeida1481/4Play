import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppImage from '../Components/AppImage'
import '../Assets/css/navbar-fixed-left.css'


class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userName: localStorage.getItem('userName') || "User"
        }
    }

    render() {
        return (
            <>
                <nav className="navbar navbar-expand-custom sidebar fixed-left">
                    <div style={{padding: '5 10 5 10', width: '100%'}}>
                        <span className="navbar-brand">
                            <AppImage height="30px" />
                        </span>
                
                        <div className="float-right">
                            <button className="navbar-toggler float-right" type="button" data-toggle="collapse" data-target="#navbar">
                                <span className="navbar-toggler-icon">
                                    <i className="fas fa-bars" style={{color: "var(--pinkColor)", fontSize: 28}}></i>
                                </span>
                            </button>
                        </div>
                    </div>
                
                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="navbar-nav">

                            {/* <!--  -->
                            <!-- MAIN -->
                            <!--  --> */}

                            <li>
                                <h3 className="side-title">Main</h3>
                            </li>

                            <li className="nav-item my-nav-item hidden-nav-item">
                                <Link className="nav-link" to="/profile">
                                    <i className="fas fas-sidebar fa-user fa-fw"></i>
                                    <span className="span-nav">Meu Perfil</span>
                                </Link>
                            </li>

                            <li className="nav-item my-nav-item">
                                <Link className="nav-link" to="/main">
                                    <i className="fas fas-sidebar fa-chart-line fa-fw"></i>
                                    <span className="span-nav">Meus Grupos</span>
                                </Link>
                            </li>
                
                            <li className="nav-item my-nav-item">
                                <Link className="nav-link" to="/players">
                                    <i className="fas fas-sidebar fa-users fa-fw"></i>
                                    <span className="span-nav">Jogadores</span>
                                </Link>
                            </li>
                
                            {/* <!--  -->
                            <!-- OTHERS -->
                            <!--  --> */}
                
                            <li>
                                <h3 className="side-title">Outros</h3>
                            </li>
                
                            <li className="nav-item my-nav-item hidden-nav-item">
                                <a className="nav-link" href="/logout">
                                    <i className="fas fas-sidebar fa-sign-out-alt fa-fw"></i>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <nav className="navbar navbar-expand-custom navbar-dark navbar-default" id="topBar">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item dropdown">
                                <span style={{color: "#fff"}} className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    { this.state.userName }
                                </span>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="/profile">
                                        <i className="fas fa-user fa-fw"></i> Meu Perfil
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="/logout">
                                        <i className="fas fa-sign-out-alt fa-fw"></i> Logout
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </>
        )
    }
}

export default Navbar
