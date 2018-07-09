import React, {Component} from 'react'
import {Router, Switch, Link, Route} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import Login_form from './Login-form'
import Login_find from './Login-find'
import Register from './Register'
import BgVideo from '../img/night.mp4'
import '../css/Login.css'
const history = createBrowserHistory()

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bgStyle: {}
        }
    }

    componentDidMount() {
        // 视频背景尺寸
        window.onresize = () => {
            const windowWidth = document.body.clientWidth
            const windowHeight = document.body.clientHeight
            const windowAspectRatio = windowHeight / windowWidth
            let videoWidth
            let videoHeight
            if (windowAspectRatio < 0.5625) {
                videoWidth = windowWidth
                videoHeight = videoWidth * 0.5625
                this.setState({
                    bgStyle: {
                        height: windowWidth * 0.5625 + 'px',
                        width: windowWidth + 'px',
                        'bottom': (windowHeight - videoHeight) / 2 + 'px',
                        'left': 'initial'
                    }
                })
            } else {
                videoHeight = windowHeight
                videoWidth = videoHeight / 0.5625
                this.setState({
                    bgStyle: {
                        height: windowHeight + 'px',
                        width: windowHeight / 0.5625 + 'px',
                        'left': (windowWidth - videoWidth) / 2 + 'px',
                        'bottom': 'initial'
                    }
                })
            }
        }
        window.onresize()
    }

    render() {
        return (
            <Router history={history}>
                <div className='Login'>
                    <video style={this.state.bgStyle} className='Login-bg' autoPlay loop src={BgVideo}></video>
                    <div className='Login-container'>
                        <Route path='/login' exact component={Login_form}></Route>
                        <Route path='/login/find' component={Login_find}></Route>
                        <Route path='/login/register' component={Register}></Route>
                    </div>
                </div>
            </Router>
        )
    }
}

export default Login