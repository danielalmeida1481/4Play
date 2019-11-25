import { Component } from 'react'
import authController from '../Helpers/authController'

class Auth extends Component {
    UNSAFE_componentWillMount() {
        authController.isLoggedIn()
    }
}

export default Auth
