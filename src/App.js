import React, {Component} from 'react';
import {
    BrowserRouter,
    Router,
    Route,
    Switch
} from 'react-router-dom'
import Start from './component/Start'
import Home from './component/Home'
import Admin from './component/Admin'
import Login from './component/Login'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Start}></Route>
                    <Route path='/home' component={Home}></Route>
                    <Route path='/admin' component={Admin}></Route>
                    <Route path='/login' component={Login}></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
