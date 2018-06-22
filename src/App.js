import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import './css/App.css'
import Start from './component/Start'
import Home from './component/Home'

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <div>
                    <Route path='/' exact component={Start}></Route>
                    <Route path='/home' component={Home}></Route>
                </div>
            </Router>
        );
    }
}

export default App;
