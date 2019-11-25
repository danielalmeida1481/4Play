import React from 'react'
import '../../Assets/css/animation.css'

import AppImage from '../../Components/AppImage'
import LoadingApp from '../../Components/LoadingApp'

import { Link } from 'react-router-dom'
import Auth from '../../Components/Auth'

class Index extends Auth {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false
    }
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({
        isLoaded: true
      })
    }, 500);
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <div className="row vertical-center h-100-force fade-in">
          <div className="col-md-7 order-md-12">
            <AppImage />
          </div>
    
          <div className="col-md-5 order-md-1 t-md-right t-mmd-center">
            <h1 className="capitalize t-title">Welcome player</h1>
            <Link to="/login" className="capitalize btn btn-play an-ripple mt-3">
              Play
            </Link>
          </div>
        </div>
      )
    } else {
      return (
        <div className="row vertical-center h-100-force t-center">
          <LoadingApp />
        </div>
      )
    }
  }
}

export default Index
