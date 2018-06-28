import React, {Component} from 'react'
import {Router, Switch, Link, Route} from 'react-router-dom'
import {createBrowserHistory} from 'history'
//引入组件
import AdminHome from './Admin-home'
import Addblog from './Addblog'
// 引入css
import '../css/Admin.css'
const history = createBrowserHistory()

class Admin extends Component {
    render() {
        return(
            <Router history={history}>
                <div className='Admin'>
                    <div className='Admin-sidebar'>
                        sidebar
                    </div>
                    <div className="Admin-header">
                        header
                    </div>
                    <div className='Admin-container'>
                        <Route path='/' exact component={AdminHome}></Route>
                        <Route path='/admin' exact component={AdminHome}></Route>
                        <Route path='/admin/addblog' exact component={Addblog}></Route>
                    </div>
                </div>
            </Router>
        )
    }
}

export default Admin