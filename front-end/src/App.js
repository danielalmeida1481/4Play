import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './Assets/css/main.css'
import './Assets/css/overrides.css'

import Index from './Pages/Guest/Index'
import Login from './Pages/Guest/Login'
import Register from './Pages/Guest/Register'


import Main from './Pages/Main'

import Profile from './Pages/Profile'

import Players from './Pages/Players'

import Logout from './Pages/Logout'


import ViewGroup from './Pages/Group/View'
import CreateGroup from './Pages/Group/Create'
import ListGroups from './Pages/Group/List'

const Routes = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={ Index } />

            <Route path="/login" component={ Login } />

            <Route path="/register" component={ Register } />

            <Route path="/main" component={ Main } />

            <Route path="/profile/:userId" component={ Profile } />
            <Route path="/profile" component={ Profile } />

            <Route path="/players" component={ Players } />

            <Route path="/logout" component={ Logout } />

            <Route path="/group/create" component={ CreateGroup } />
            <Route path="/group/list" component={ ListGroups } />
            <Route path="/group/:groupId" component={ ViewGroup } />

            {/* <Route path="*" component={ NotFound } /> */}
        </Switch>
    </Router>
)

const App = () => <Routes />;

export default App
