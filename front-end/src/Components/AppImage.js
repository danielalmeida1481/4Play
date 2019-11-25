import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Image from '../4Play.png';

class AppImage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      height: this.props.height,
      width: this.props.width,
      className: this.props.className
    }
  }

  render() {
    if (this.props.redirect) {
      return (
        <Link to="/">
          <img className={"img-fluid " + this.state.className} style={{width: this.state.width, height: this.state.height}} src={ Image } alt="4Play" />
        </Link>
      )
    } else {
      return (
        <img className={"img-fluid " + this.state.className} style={{width: this.state.width, height: this.state.height}} src={ Image } alt="4Play" />
      )
    }
  }
}

export default AppImage;
