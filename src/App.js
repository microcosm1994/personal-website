import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import Start from './component/Start'
import Home from './component/Home'

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact component={Start}></Route>
                    <Route path='/home' exact component={Home}></Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
