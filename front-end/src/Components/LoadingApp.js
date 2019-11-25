import React, {Component} from 'react'

class LoadingApp extends Component {
  render() {
    return (
      <div className="col-12 t-center">
        <div className="spinner-border spinner-default" style={{width: 100, height: 100}} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
}

export default LoadingApp
